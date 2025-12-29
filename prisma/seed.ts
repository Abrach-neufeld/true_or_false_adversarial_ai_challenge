import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  { name: 'General', description: 'General knowledge trivia' },
  { name: 'History', description: 'Historical facts and figures' },
  { name: 'Science', description: 'Science and nature facts' },
  { name: 'Animals', description: 'Animal biology and behavior' },
  { name: 'Geography', description: 'Geographic facts and places' },
  { name: 'Food', description: 'Food and cuisine trivia' },
  { name: 'Language', description: 'Language and etymology' },
  { name: 'Arts', description: 'Arts and entertainment' },
  { name: 'Technology', description: 'Technology and inventions' },
  { name: 'Religion', description: 'Religion and mythology' },
  { name: 'Human Body', description: 'Human body and medicine' },
  { name: 'Space', description: 'Space and astronomy' },
];

const statements = [
  // General (first 12 statements before category comments)
  { statementText: "Tomatoes originally came from Italy", truthValue: "False", category: "General" },
  { statementText: "Maine is the U.S. state with the most number of lighthouses", truthValue: "False", category: "General" },
  { statementText: "The unicorn is the national animal of Scotland", truthValue: "True", category: "General" },
  { statementText: "A lion's roar can be heard up to eight kilometres away", truthValue: "True", category: "General" },
  { statementText: "A day on Venus is longer than a year on Venus", truthValue: "True", category: "General" },
  { statementText: "An ostrich's eye is bigger than its brain", truthValue: "True", category: "General" },
  { statementText: "Sloths can hold their breath longer than dolphins", truthValue: "True", category: "General" },
  { statementText: "Genghis Khan died in battle", truthValue: "False", category: "General" },
  { statementText: "The Magna Carta was originally written in Latin", truthValue: "True", category: "General" },
  { statementText: "The Mayan civilization had a written calendar system more accurate than the Julian calendar", truthValue: "True", category: "General" },
  { statementText: "The Taiping Rebellion was deadlier than World War I", truthValue: "True", category: "General" },
  { statementText: "The Spanish flu pandemic killed more people than the Black Death", truthValue: "False", category: "General" },

  // History & Historical Figures
  { statementText: "Napoleon Bonaparte was unusually short for a man of his era", truthValue: "False", category: "History" },
  { statementText: "Cleopatra lived closer in time to the Moon landing than to the construction of the Great Pyramid of Giza", truthValue: "True", category: "History" },
  { statementText: "Oxford University is older than the Aztec Empire", truthValue: "True", category: "History" },
  { statementText: "Vikings commonly wore horned helmets in battle", truthValue: "False", category: "History" },
  { statementText: "Albert Einstein failed mathematics as a student", truthValue: "False", category: "History" },
  { statementText: "Marie Antoinette said 'Let them eat cake' when told the peasants had no bread", truthValue: "False", category: "History" },
  { statementText: "The Roman Emperor Nero played the fiddle while Rome burned", truthValue: "False", category: "History" },
  { statementText: "The Salem witch trials executed accused witches by burning them at the stake", truthValue: "False", category: "History" },
  { statementText: "Christopher Columbus set out to prove the Earth was round to skeptics who believed it was flat", truthValue: "False", category: "History" },
  { statementText: "The shortest war in recorded history lasted only 38 minutes", truthValue: "True", category: "History" },
  { statementText: "Vincent van Gogh cut off his entire ear during his mental breakdown", truthValue: "False", category: "History" },
  { statementText: "Paul Revere shouted 'The British are coming!' during his midnight ride", truthValue: "False", category: "History" },
  { statementText: "The ancient Library of Alexandria was destroyed in a single catastrophic fire", truthValue: "False", category: "History" },
  { statementText: "Medieval Europeans commonly believed the Earth was flat", truthValue: "False", category: "History" },
  { statementText: "Rasputin survived being poisoned, shot, and beaten before finally drowning", truthValue: "True", category: "History" },
  { statementText: "The Titanic was officially advertised as 'unsinkable' by the White Star Line", truthValue: "False", category: "History" },
  { statementText: "Roman gladiator fights usually ended in death", truthValue: "False", category: "History" },
  { statementText: "Samurai warriors were legally permitted to kill commoners for perceived insults", truthValue: "True", category: "History" },
  { statementText: "The ancient Olympics were held continuously for over 1,000 years", truthValue: "True", category: "History" },

  // Science & Nature
  { statementText: "Sharks existed on Earth before trees did", truthValue: "True", category: "Science" },
  { statementText: "Lightning never strikes the same place twice", truthValue: "False", category: "Science" },
  { statementText: "Goldfish have a memory span of only three seconds", truthValue: "False", category: "Science" },
  { statementText: "Bats are completely blind and navigate only by echolocation", truthValue: "False", category: "Science" },
  { statementText: "Hair and fingernails continue to grow after death", truthValue: "False", category: "Science" },
  { statementText: "Glass is actually a very slow-moving liquid rather than a solid", truthValue: "False", category: "Science" },
  { statementText: "Diamonds are formed from compressed coal deep in the Earth", truthValue: "False", category: "Science" },
  { statementText: "A bolt of lightning is approximately five times hotter than the surface of the Sun", truthValue: "True", category: "Science" },
  { statementText: "Wombat feces are naturally cube-shaped", truthValue: "True", category: "Science" },
  { statementText: "Octopuses have three hearts", truthValue: "True", category: "Science" },
  { statementText: "Hot water can freeze faster than cold water under certain conditions", truthValue: "True", category: "Science" },
  { statementText: "Honey found in ancient Egyptian tombs was still edible after thousands of years", truthValue: "True", category: "Science" },
  { statementText: "The fingerprints of koalas are virtually indistinguishable from human fingerprints", truthValue: "True", category: "Science" },
  { statementText: "Shaving causes hair to grow back thicker and darker", truthValue: "False", category: "Science" },
  { statementText: "Cracking your knuckles causes arthritis", truthValue: "False", category: "Science" },
  { statementText: "Lemmings periodically commit mass suicide by jumping off cliffs", truthValue: "False", category: "Science" },
  { statementText: "Bananas are botanically classified as berries while strawberries are not", truthValue: "True", category: "Science" },
  { statementText: "The heart of a blue whale is large enough for a human to crawl through its arteries", truthValue: "True", category: "Science" },

  // Animals & Biology
  { statementText: "Bulls are enraged specifically by the color red", truthValue: "False", category: "Animals" },
  { statementText: "Chameleons change color primarily to match their surroundings for camouflage", truthValue: "False", category: "Animals" },
  { statementText: "Touching a baby bird will cause its mother to reject it due to human scent", truthValue: "False", category: "Animals" },
  { statementText: "Dolphins have unique signature whistles that function like individual names", truthValue: "True", category: "Animals" },
  { statementText: "Cows form close friendships and become stressed when separated from their companions", truthValue: "True", category: "Animals" },
  { statementText: "Armadillos almost always give birth to genetically identical quadruplets", truthValue: "True", category: "Animals" },
  { statementText: "A group of flamingos is called a flamboyance", truthValue: "True", category: "Animals" },
  { statementText: "Giraffes sleep only about 30 minutes per day in short bursts", truthValue: "True", category: "Animals" },
  { statementText: "Mantis shrimp can punch with the force of a bullet and see more colors than humans", truthValue: "True", category: "Animals" },
  { statementText: "A cockroach can survive for weeks without its head", truthValue: "True", category: "Animals" },
  { statementText: "The pistol shrimp can create a bubble that briefly reaches temperatures hotter than the Sun", truthValue: "True", category: "Animals" },

  // Geography & Places
  { statementText: "The Sahara Desert is the largest desert in the world", truthValue: "False", category: "Geography" },
  { statementText: "Mount Everest is the tallest mountain on Earth when measured from base to peak", truthValue: "False", category: "Geography" },
  { statementText: "The Canary Islands were named after the canary bird", truthValue: "False", category: "Geography" },
  { statementText: "The Eiffel Tower can grow up to six inches taller during hot summer days", truthValue: "True", category: "Geography" },
  { statementText: "In Switzerland it is illegal to own just one guinea pig", truthValue: "True", category: "Geography" },
  { statementText: "The longest place name in the world contains 85 letters and is located in New Zealand", truthValue: "True", category: "Geography" },
  { statementText: "There is a town in Norway called Hell that freezes over every winter", truthValue: "True", category: "Geography" },

  // Food & Cuisine
  { statementText: "Fortune cookies originated in China", truthValue: "False", category: "Food" },
  { statementText: "The word sushi means raw fish in Japanese", truthValue: "False", category: "Food" },
  { statementText: "Twinkies have an indefinite shelf life and never go bad", truthValue: "False", category: "Food" },
  { statementText: "Spinach contains exceptionally high levels of iron compared to other vegetables", truthValue: "False", category: "Food" },
  { statementText: "Carrots significantly improve night vision", truthValue: "False", category: "Food" },
  { statementText: "Lobster was once considered food for the poor and was fed to prisoners in colonial America", truthValue: "True", category: "Food" },
  { statementText: "The inventor of Pringles is buried in a Pringles can", truthValue: "True", category: "Food" },
  { statementText: "Honey is the only food that never spoils", truthValue: "False", category: "Food" },
  { statementText: "Ketchup was sold as medicine in the 1830s", truthValue: "True", category: "Food" },
  { statementText: "Peanuts are one of the ingredients used to make dynamite", truthValue: "True", category: "Food" },
  { statementText: "McDonald's once created bubblegum-flavored broccoli", truthValue: "True", category: "Food" },

  // Language & Words
  { statementText: "The word 'golf' is an acronym for 'Gentlemen Only, Ladies Forbidden'", truthValue: "False", category: "Language" },
  { statementText: "Eskimo languages have hundreds of words for snow", truthValue: "False", category: "Language" },
  { statementText: "The phrase 'rule of thumb' originated from a law allowing men to beat their wives with a stick", truthValue: "False", category: "Language" },
  { statementText: "The dot over a lowercase 'i' or 'j' is called a tittle", truthValue: "True", category: "Language" },
  { statementText: "The Hawaiian alphabet contains only 12 letters", truthValue: "True", category: "Language" },

  // Arts & Entertainment
  { statementText: "The Mona Lisa has no visible eyebrows", truthValue: "True", category: "Arts" },
  { statementText: "Nintendo was founded in 1889 as a playing card company", truthValue: "True", category: "Arts" },
  { statementText: "Walt Disney was cryogenically frozen after his death", truthValue: "False", category: "Arts" },
  { statementText: "The iconic Star Wars line is 'Luke, I am your father'", truthValue: "False", category: "Arts" },
  { statementText: "Frankenstein is the name of the monster in Mary Shelley's novel", truthValue: "False", category: "Arts" },
  { statementText: "The first feature-length animated film was made by Disney", truthValue: "False", category: "Arts" },
  { statementText: "Beethoven composed some of his greatest works while completely deaf", truthValue: "True", category: "Arts" },
  { statementText: "The original Monopoly game was designed to demonstrate the problems with capitalism", truthValue: "True", category: "Arts" },
  { statementText: "Charlie Chaplin once lost a Charlie Chaplin lookalike contest", truthValue: "True", category: "Arts" },

  // Technology & Inventions
  { statementText: "Thomas Edison invented the light bulb", truthValue: "False", category: "Technology" },
  { statementText: "The first computer programmer in history was a woman", truthValue: "True", category: "Technology" },
  { statementText: "The cigarette lighter was invented before the friction match", truthValue: "True", category: "Technology" },
  { statementText: "The microwave oven was invented accidentally when a radar engineer noticed his chocolate bar melting", truthValue: "True", category: "Technology" },
  { statementText: "The first webcam was created to monitor a coffee pot", truthValue: "True", category: "Technology" },

  // Religion & Mythology
  { statementText: "The Bible specifically identifies the forbidden fruit in Eden as an apple", truthValue: "False", category: "Religion" },
  { statementText: "The iron maiden was a common medieval torture device", truthValue: "False", category: "Religion" },
  { statementText: "Buddha is traditionally depicted as overweight because he lived a life of excess", truthValue: "False", category: "Religion" },
  { statementText: "The three wise men in the Christmas story are named in the Bible", truthValue: "False", category: "Religion" },
  { statementText: "Ancient Egyptian pharaohs were commonly mummified with their organs placed in separate jars", truthValue: "True", category: "Religion" },
  { statementText: "The word 'assassin' derives from a group of medieval killers who used hashish", truthValue: "True", category: "Religion" },

  // Human Body & Medicine
  { statementText: "Humans have five distinct senses", truthValue: "False", category: "Human Body" },
  { statementText: "Blood in your veins is blue until it is exposed to oxygen", truthValue: "False", category: "Human Body" },
  { statementText: "Humans swallow an average of eight spiders per year while sleeping", truthValue: "False", category: "Human Body" },
  { statementText: "The acid in your stomach is strong enough to dissolve razor blades", truthValue: "True", category: "Human Body" },
  { statementText: "Humans are bioluminescent but the light is too faint for our eyes to detect", truthValue: "True", category: "Human Body" },

  // Space & Astronomy
  { statementText: "There is a permanent dark side of the Moon that never receives sunlight", truthValue: "False", category: "Space" },
  { statementText: "A day on Mercury is longer than a year on Mercury", truthValue: "True", category: "Space" },
  { statementText: "Neutron stars are so dense that a teaspoon would weigh about 6 billion tons", truthValue: "True", category: "Space" },
  { statementText: "The footprints left by Apollo astronauts on the Moon will likely remain visible for millions of years", truthValue: "True", category: "Space" },
];

async function main() {
  console.log('Seeding database...');

  // Create categories first
  console.log('Creating categories...');
  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }

  // Get category map for linking
  const categoryRecords = await prisma.category.findMany();
  const categoryIdMap = new Map(categoryRecords.map(c => [c.name, c.id]));

  // Create statements
  console.log('Creating statements...');
  let created = 0;
  for (const statement of statements) {
    const categoryId = categoryIdMap.get(statement.category);
    if (!categoryId) {
      console.error(`Category not found: ${statement.category}`);
      continue;
    }

    // Check if statement already exists
    const existing = await prisma.statement.findFirst({
      where: { statementText: statement.statementText },
    });

    if (!existing) {
      await prisma.statement.create({
        data: {
          statementText: statement.statementText,
          truthValue: statement.truthValue,
          categoryId: categoryId,
        },
      });
      created++;
    }
  }

  console.log(`Seeding complete! Created ${created} new statements.`);

  // Log summary
  const totalStatements = await prisma.statement.count();
  const totalCategories = await prisma.category.count();
  console.log(`Database now has ${totalStatements} statements across ${totalCategories} categories.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
