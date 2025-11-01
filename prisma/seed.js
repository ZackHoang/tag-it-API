import prisma from './prisma.js';

async function main() {
    await prisma.game.create({
        data: {
            image: 'https://res.cloudinary.com/dazy1wrx0/image/upload/pixelcon_a10dsa.jpg',
            source: 'https://pxlcon.jimmysomething.com/',
            width: 3600,
            height: 2544,
            characters: [
                {
                    name: 'Ken',
                    image: 'https://res.cloudinary.com/dazy1wrx0/image/upload/v1756415137/ken_dfydza.png',
                    top_left: {
                        x: 179,
                        y: 2079,
                    },
                    bottom_right: {
                        x: 234,
                        y: 2211,
                    },
                },
                {
                    name: 'Ichigo',
                    image: 'https://res.cloudinary.com/dazy1wrx0/image/upload/v1756415137/ichigo_kv69js.png',
                    top_left: {
                        x: 1725,
                        y: 709,
                    },
                    bottom_right: {
                        x: 1787,
                        y: 829,
                    },
                },
                {
                    name: 'Finn',
                    image: 'https://res.cloudinary.com/dazy1wrx0/image/upload/v1756415136/finn_iue77m.png',
                    top_left: {
                        x: 352,
                        y: 2387,
                    },
                    bottom_right: {
                        x: 396,
                        y: 2508,
                    },
                },
            ],
        },
    });
    console.log("Seed complete");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
