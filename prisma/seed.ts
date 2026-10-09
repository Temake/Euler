import { PrismaClient } from '@prisma/client';
import { cloudQuestions, RawQuestion } from './seedData/cloudQuestions';
import { computingQuestions } from './seedData/computingQuestions';
import { networkQuestions } from './seedData/networkQuestions';

const prisma = new PrismaClient();

const TRACK_WEEKS = [
  // CLOUD TRACK
  { track: 'CLOUD', weekNumber: 1, title: 'Cloud Basics & Compute Infrastructure', isUnlocked: true },
  { track: 'CLOUD', weekNumber: 2, title: 'Cloud Network & Storage Services', isUnlocked: false },
  { track: 'CLOUD', weekNumber: 3, title: 'Cloud Databases & Cloud Native', isUnlocked: false },
  { track: 'CLOUD', weekNumber: 4, title: 'AI Foundations & Large Model Concepts', isUnlocked: false },
  { track: 'CLOUD', weekNumber: 5, title: 'Huawei AI Platform (ModelArts)', isUnlocked: false },
  { track: 'CLOUD', weekNumber: 6, title: 'Preliminary Round Mock Simulation (60 Qs / 60 Mins / 1000 Pts)', isUnlocked: false },

  // COMPUTING TRACK
  { track: 'COMPUTING', weekNumber: 1, title: 'openEuler Basics & CLI Foundations', isUnlocked: true },
  { track: 'COMPUTING', weekNumber: 2, title: 'openEuler System Management & Optimization', isUnlocked: false },
  { track: 'COMPUTING', weekNumber: 3, title: 'openGauss Deployment & Database Management', isUnlocked: false },
  { track: 'COMPUTING', weekNumber: 4, title: 'openGauss SQL & Core Security', isUnlocked: false },
  { track: 'COMPUTING', weekNumber: 5, title: 'Kunpeng DevKit & BoostKit Tuning', isUnlocked: false },
  { track: 'COMPUTING', weekNumber: 6, title: 'Preliminary Round Mock Simulation (60 Qs / 60 Mins / 1000 Pts)', isUnlocked: false },

  // NETWORK TRACK
  { track: 'NETWORK', weekNumber: 1, title: 'Datacom Basics & Layer 2 Switching', isUnlocked: true },
  { track: 'NETWORK', weekNumber: 2, title: 'IP Routing, OSPF & IPv6 Foundations', isUnlocked: false },
  { track: 'NETWORK', weekNumber: 3, title: 'WAN Technologies, AAA & Network Security', isUnlocked: false },
  { track: 'NETWORK', weekNumber: 4, title: 'VPN Technologies & DCN Fundamentals', isUnlocked: false },
  { track: 'NETWORK', weekNumber: 5, title: 'WLAN Services, Security & Planning', isUnlocked: false },
  { track: 'NETWORK', weekNumber: 6, title: 'Preliminary Round Mock Simulation (60 Qs / 60 Mins / 1000 Pts)', isUnlocked: false },
];

async function seedTrackQuestions(track: string, questions: RawQuestion[]) {
  console.log(`Seeding ${questions.length} questions for track: ${track}...`);
  const CHUNK_SIZE = 15;
  for (let i = 0; i < questions.length; i += CHUNK_SIZE) {
    const chunk = questions.slice(i, i + CHUNK_SIZE);
    await Promise.all(
      chunk.map((q) => {
        const OPTION_KEYS = ['A', 'B', 'C', 'D', 'E', 'F'];
        const shuffledOptions = [...q.options];
        for (let i = shuffledOptions.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
        }

        return prisma.question.create({
          data: {
            track,
            weekNumber: q.weekNumber,
            domain: q.domain,
            topic: q.topic,
            stage: q.stage || 'WEEKLY',
            questionType: q.questionType,
            questionText: q.questionText,
            explanation: q.explanation,
            options: {
              create: shuffledOptions.map((opt, idx) => ({
                optionKey: OPTION_KEYS[idx] || String.fromCharCode(65 + idx),
                optionText: opt.text,
                isCorrect: opt.isCorrect,
              })),
            },
          },
        });
      })
    );
  }
}

interface MockSelectionRule {
  week: number;
  count: number;
}

async function populateWeek6MockExam(track: string, selectionRules: MockSelectionRule[]) {
  console.log(`Configuring Week 6 Preliminary Mock Exam for track: ${track}...`);
  const selectedQuestions: any[] = [];

  for (const rule of selectionRules) {
    const pool = await prisma.question.findMany({
      where: { track, weekNumber: rule.week },
      include: { options: true },
      take: rule.count,
      orderBy: { id: 'asc' },
    });
    selectedQuestions.push(...pool);
  }

  console.log(`Selected ${selectedQuestions.length} questions for ${track} Week 6 Mock Exam.`);

  const CHUNK_SIZE = 15;
  for (let i = 0; i < selectedQuestions.length; i += CHUNK_SIZE) {
    const chunk = selectedQuestions.slice(i, i + CHUNK_SIZE);
    await Promise.all(
      chunk.map((q) =>
        prisma.question.create({
          data: {
            track: q.track,
            weekNumber: 6,
            domain: q.domain,
            topic: q.topic,
            stage: 'PRELIMINARY',
            questionType: q.questionType,
            questionText: q.questionText,
            explanation: q.explanation,
            options: {
              create: q.options.map((opt: any) => ({
                optionKey: opt.optionKey,
                optionText: opt.optionText,
                isCorrect: opt.isCorrect,
              })),
            },
          },
        })
      )
    );
  }
}

async function main() {
  console.log('=== Starting Euler Database Seeder ===');

  // 1. Seed Track Weeks
  console.log('1. Syncing TrackWeek records...');
  for (const tw of TRACK_WEEKS) {
    await prisma.trackWeek.upsert({
      where: {
        track_weekNumber: {
          track: tw.track,
          weekNumber: tw.weekNumber,
        },
      },
      update: {
        title: tw.title,
        isUnlocked: tw.isUnlocked,
      },
      create: {
        track: tw.track,
        weekNumber: tw.weekNumber,
        title: tw.title,
        isUnlocked: tw.isUnlocked,
        unlockedAt: tw.isUnlocked ? new Date() : null,
      },
    });
  }
  console.log(`Successfully synced ${TRACK_WEEKS.length} TrackWeek records.`);

  // 2. Clear existing questions and answers
  console.log('2. Cleaning previous questions and answers...');
  await prisma.userAnswer.deleteMany({});
  await prisma.bookmark.deleteMany({});
  await prisma.questionOption.deleteMany({});
  await prisma.question.deleteMany({});

  // 3. Seed Questions for CLOUD, COMPUTING, NETWORK (Weeks 1-5: 150 questions per track)
  console.log('3. Seeding Weekly Curriculum Questions (Weeks 1-5)...');
  await seedTrackQuestions('CLOUD', cloudQuestions);
  await seedTrackQuestions('COMPUTING', computingQuestions);
  await seedTrackQuestions('NETWORK', networkQuestions);

  // 4. Populate Week 6 Mock Exam Pools adhering strictly to official track weighting rules
  console.log('4. Generating Week 6 Preliminary Mock Exam Pools...');

  // Cloud: 60% Cloud Services (36 Qs) / 40% AI (24 Qs) = 60 Qs total
  await populateWeek6MockExam('CLOUD', [
    { week: 1, count: 12 }, // Cloud Compute (12 Qs)
    { week: 2, count: 12 }, // Storage & Networking (12 Qs)
    { week: 3, count: 12 }, // Databases & Cloud Native (12 Qs) -> 36 Qs Cloud (60%)
    { week: 4, count: 12 }, // AI Foundations & Large Models (12 Qs)
    { week: 5, count: 12 }, // ModelArts AI Platform (12 Qs) -> 24 Qs AI (40%)
  ]);

  // Computing: 50% openEuler (30 Qs) / 30% openGauss (18 Qs) / 20% Kunpeng (12 Qs) = 60 Qs total
  await populateWeek6MockExam('COMPUTING', [
    { week: 1, count: 15 }, // openEuler Basics (15 Qs)
    { week: 2, count: 15 }, // openEuler System Mgmt & Optimization (15 Qs) -> 30 Qs openEuler (50%)
    { week: 3, count: 9 },  // openGauss Deployment & Admin (9 Qs)
    { week: 4, count: 9 },  // openGauss SQL & Security (9 Qs) -> 18 Qs openGauss (30%)
    { week: 5, count: 12 }, // Kunpeng DevKit & BoostKit (12 Qs, 20%)
  ]);

  // Network: 40% Datacom (24 Qs) / 20% DCN (12 Qs) / 20% Security (12 Qs) / 20% WLAN (12 Qs) = 60 Qs total
  await populateWeek6MockExam('NETWORK', [
    { week: 1, count: 12 }, // Datacom Basics & L2 Switching (12 Qs)
    { week: 2, count: 12 }, // Routing & IPv6 (12 Qs) -> 24 Qs Datacom (40%)
    { week: 3, count: 12 }, // WAN, AAA & Network Security (12 Qs, 20%)
    { week: 4, count: 12 }, // VPN & DCN Fundamentals (12 Qs, 20%)
    { week: 5, count: 12 }, // WLAN Services & Planning (12 Qs, 20%)
  ]);

  // 5. Output summary metrics
  const totalQuestions = await prisma.question.count();
  const cloudCount = await prisma.question.count({ where: { track: 'CLOUD' } });
  const compCount = await prisma.question.count({ where: { track: 'COMPUTING' } });
  const netCount = await prisma.question.count({ where: { track: 'NETWORK' } });
  const mockCount = await prisma.question.count({ where: { weekNumber: 6 } });

  console.log('\n=== Database Seeding Complete ===');
  console.log(`Total questions across all tracks: ${totalQuestions}`);
  console.log(`- Cloud Track: ${cloudCount} questions (150 weekly + 60 mock)`);
  console.log(`- Computing Track: ${compCount} questions (150 weekly + 60 mock)`);
  console.log(`- Network Track: ${netCount} questions (150 weekly + 60 mock)`);
  console.log(`- Total Week 6 Preliminary Mock Exam questions: ${mockCount} (60 per track)`);
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
