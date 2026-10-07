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
  for (const q of questions) {
    const createdQuestion = await prisma.question.create({
      data: {
        track,
        weekNumber: q.weekNumber,
        domain: q.domain,
        topic: q.topic,
        stage: q.stage,
        questionType: q.questionType,
        questionText: q.questionText,
        explanation: q.explanation,
        options: {
          create: q.options.map((opt) => ({
            optionKey: opt.key,
            optionText: opt.text,
            isCorrect: opt.isCorrect,
          })),
        },
      },
    });
  }
}

async function main() {
  console.log('Starting Euler Database Seeder...');

  // 1. Seed Track Weeks
  console.log('Syncing TrackWeek records...');
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

  // 2. Clear existing questions and seed fresh authentic question bank
  console.log('Cleaning old questions and answers...');
  await prisma.userAnswer.deleteMany({});
  await prisma.bookmark.deleteMany({});
  await prisma.questionOption.deleteMany({});
  await prisma.question.deleteMany({});

  // 3. Seed Questions for CLOUD, COMPUTING, NETWORK
  await seedTrackQuestions('CLOUD', cloudQuestions);
  await seedTrackQuestions('COMPUTING', computingQuestions);
  await seedTrackQuestions('NETWORK', networkQuestions);

  // 4. Duplicate relevant Week 1-5 questions to Week 6 Mock Exam pool
  console.log('Populating Week 6 Preliminary Mock Exam pools...');
  const allQuestions = await prisma.question.findMany({
    where: { weekNumber: { in: [1, 2, 3, 4, 5] } },
    include: { options: true }
  });

  for (const q of allQuestions) {
    await prisma.question.create({
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
          create: q.options.map(opt => ({
            optionKey: opt.optionKey,
            optionText: opt.optionText,
            isCorrect: opt.isCorrect
          }))
        }
      }
    });
  }

  const totalQuestions = await prisma.question.count();
  console.log(`Seeding complete! Total questions across all tracks: ${totalQuestions}`);
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
