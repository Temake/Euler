import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const counts = await prisma.question.groupBy({
    by: ['track', 'weekNumber'],
    _count: { id: true },
    orderBy: [{ track: 'asc' }, { weekNumber: 'asc' }]
  });

  const totals = await prisma.question.groupBy({
    by: ['track'],
    _count: { id: true },
    orderBy: { track: 'asc' }
  });

  console.log('--- BY WEEK ---');
  console.log(JSON.stringify(counts, null, 2));
  console.log('--- TOTALS ---');
  console.log(JSON.stringify(totals, null, 2));
}

main().finally(() => prisma.$disconnect());
