export const MODEL = "gpt-4.1";


export interface Statement {
  statementText: string;
  truthValue: string;
}

// Developer prompt for the assistant
export const statementList: Statement[] = [
  {"statementText":"Tomatoes originally came from Italy","truthValue":"False"},
  {"statementText":"Maine is the U.S. state with the most number of lighthouses","truthValue":"False"},
  {"statementText":"The unicorn is the national animal of Scotland","truthValue":"True"},
  {"statementText":"A lion's roar can be heard up to eight kilometres away","truthValue":"True"},
  {"statementText":"A day on Venus is longer than a year on Venus","truthValue":"True"},
  {"statementText":"An ostrich's eye is bigger than its brain","truthValue":"True"},
  {"statementText":"Sloths can hold their breath longer than dolphins","truthValue":"True"},
  {"statementText":"Genghis Khan died in battle","truthValue":"False"},
  {"statementText":"The Magna Carta was originally written in Latin","truthValue":"True"},
  {"statementText":"The Mayan civilization had a written calendar system more accurate than the Julian calendar","truthValue":"True"},
  {"statementText":"The Taiping Rebellion was deadlier than World War I","truthValue":"True"},
  {"statementText":"The Spanish flu pandemic killed more people than the Black Death","truthValue":"False"},

  // History & Historical Figures
  {"statementText":"Napoleon Bonaparte was unusually short for a man of his era","truthValue":"False"},
  {"statementText":"Cleopatra lived closer in time to the Moon landing than to the construction of the Great Pyramid of Giza","truthValue":"True"},
  {"statementText":"Oxford University is older than the Aztec Empire","truthValue":"True"},
  {"statementText":"Vikings commonly wore horned helmets in battle","truthValue":"False"},
  {"statementText":"Albert Einstein failed mathematics as a student","truthValue":"False"},
  {"statementText":"Marie Antoinette said 'Let them eat cake' when told the peasants had no bread","truthValue":"False"},
  {"statementText":"The Roman Emperor Nero played the fiddle while Rome burned","truthValue":"False"},
  {"statementText":"The Salem witch trials executed accused witches by burning them at the stake","truthValue":"False"},
  {"statementText":"Christopher Columbus set out to prove the Earth was round to skeptics who believed it was flat","truthValue":"False"},
  {"statementText":"The shortest war in recorded history lasted only 38 minutes","truthValue":"True"},
  {"statementText":"Vincent van Gogh cut off his entire ear during his mental breakdown","truthValue":"False"},
  {"statementText":"Paul Revere shouted 'The British are coming!' during his midnight ride","truthValue":"False"},
  {"statementText":"The ancient Library of Alexandria was destroyed in a single catastrophic fire","truthValue":"False"},
  {"statementText":"Medieval Europeans commonly believed the Earth was flat","truthValue":"False"},
  {"statementText":"Rasputin survived being poisoned, shot, and beaten before finally drowning","truthValue":"True"},
  {"statementText":"The Titanic was officially advertised as 'unsinkable' by the White Star Line","truthValue":"False"},
  {"statementText":"Roman gladiator fights usually ended in death","truthValue":"False"},
  {"statementText":"Samurai warriors were legally permitted to kill commoners for perceived insults","truthValue":"True"},
  {"statementText":"The ancient Olympics were held continuously for over 1,000 years","truthValue":"True"},

  // Science & Nature
  {"statementText":"Sharks existed on Earth before trees did","truthValue":"True"},
  {"statementText":"Lightning never strikes the same place twice","truthValue":"False"},
  {"statementText":"Goldfish have a memory span of only three seconds","truthValue":"False"},
  {"statementText":"Bats are completely blind and navigate only by echolocation","truthValue":"False"},
  {"statementText":"Hair and fingernails continue to grow after death","truthValue":"False"},
  {"statementText":"Glass is actually a very slow-moving liquid rather than a solid","truthValue":"False"},
  {"statementText":"Diamonds are formed from compressed coal deep in the Earth","truthValue":"False"},
  {"statementText":"A bolt of lightning is approximately five times hotter than the surface of the Sun","truthValue":"True"},
  {"statementText":"Wombat feces are naturally cube-shaped","truthValue":"True"},
  {"statementText":"Octopuses have three hearts","truthValue":"True"},
  {"statementText":"Hot water can freeze faster than cold water under certain conditions","truthValue":"True"},
  {"statementText":"Honey found in ancient Egyptian tombs was still edible after thousands of years","truthValue":"True"},
  {"statementText":"The fingerprints of koalas are virtually indistinguishable from human fingerprints","truthValue":"True"},
  {"statementText":"Shaving causes hair to grow back thicker and darker","truthValue":"False"},
  {"statementText":"Cracking your knuckles causes arthritis","truthValue":"False"},
  {"statementText":"Lemmings periodically commit mass suicide by jumping off cliffs","truthValue":"False"},
  {"statementText":"Bananas are botanically classified as berries while strawberries are not","truthValue":"True"},
  {"statementText":"The heart of a blue whale is large enough for a human to crawl through its arteries","truthValue":"True"},

  // Animals & Biology
  {"statementText":"Bulls are enraged specifically by the color red","truthValue":"False"},
  {"statementText":"Chameleons change color primarily to match their surroundings for camouflage","truthValue":"False"},
  {"statementText":"Touching a baby bird will cause its mother to reject it due to human scent","truthValue":"False"},
  {"statementText":"Dolphins have unique signature whistles that function like individual names","truthValue":"True"},
  {"statementText":"Cows form close friendships and become stressed when separated from their companions","truthValue":"True"},
  {"statementText":"Armadillos almost always give birth to genetically identical quadruplets","truthValue":"True"},
  {"statementText":"A group of flamingos is called a flamboyance","truthValue":"True"},
  {"statementText":"Giraffes sleep only about 30 minutes per day in short bursts","truthValue":"True"},
  {"statementText":"Mantis shrimp can punch with the force of a bullet and see more colors than humans","truthValue":"True"},
  {"statementText":"A cockroach can survive for weeks without its head","truthValue":"True"},
  {"statementText":"The pistol shrimp can create a bubble that briefly reaches temperatures hotter than the Sun","truthValue":"True"},

  // Geography & Places
  {"statementText":"The Sahara Desert is the largest desert in the world","truthValue":"False"},
  {"statementText":"Mount Everest is the tallest mountain on Earth when measured from base to peak","truthValue":"False"},
  {"statementText":"The Canary Islands were named after the canary bird","truthValue":"False"},
  {"statementText":"The Eiffel Tower can grow up to six inches taller during hot summer days","truthValue":"True"},
  {"statementText":"In Switzerland it is illegal to own just one guinea pig","truthValue":"True"},
  {"statementText":"The longest place name in the world contains 85 letters and is located in New Zealand","truthValue":"True"},
  {"statementText":"There is a town in Norway called Hell that freezes over every winter","truthValue":"True"},

  // Food & Cuisine
  {"statementText":"Fortune cookies originated in China","truthValue":"False"},
  {"statementText":"The word sushi means raw fish in Japanese","truthValue":"False"},
  {"statementText":"Twinkies have an indefinite shelf life and never go bad","truthValue":"False"},
  {"statementText":"Spinach contains exceptionally high levels of iron compared to other vegetables","truthValue":"False"},
  {"statementText":"Carrots significantly improve night vision","truthValue":"False"},
  {"statementText":"Lobster was once considered food for the poor and was fed to prisoners in colonial America","truthValue":"True"},
  {"statementText":"The inventor of Pringles is buried in a Pringles can","truthValue":"True"},
  {"statementText":"Honey is the only food that never spoils","truthValue":"False"},
  {"statementText":"Ketchup was sold as medicine in the 1830s","truthValue":"True"},
  {"statementText":"Peanuts are one of the ingredients used to make dynamite","truthValue":"True"},
  {"statementText":"McDonald's once created bubblegum-flavored broccoli","truthValue":"True"},

  // Language & Words
  {"statementText":"The word 'golf' is an acronym for 'Gentlemen Only, Ladies Forbidden'","truthValue":"False"},
  {"statementText":"Eskimo languages have hundreds of words for snow","truthValue":"False"},
  {"statementText":"The phrase 'rule of thumb' originated from a law allowing men to beat their wives with a stick","truthValue":"False"},
  {"statementText":"The dot over a lowercase 'i' or 'j' is called a tittle","truthValue":"True"},
  {"statementText":"The Hawaiian alphabet contains only 12 letters","truthValue":"True"},

  // Arts & Entertainment
  {"statementText":"The Mona Lisa has no visible eyebrows","truthValue":"True"},
  {"statementText":"Nintendo was founded in 1889 as a playing card company","truthValue":"True"},
  {"statementText":"Walt Disney was cryogenically frozen after his death","truthValue":"False"},
  {"statementText":"The iconic Star Wars line is 'Luke, I am your father'","truthValue":"False"},
  {"statementText":"Frankenstein is the name of the monster in Mary Shelley's novel","truthValue":"False"},
  {"statementText":"The first feature-length animated film was made by Disney","truthValue":"False"},
  {"statementText":"Beethoven composed some of his greatest works while completely deaf","truthValue":"True"},
  {"statementText":"The original Monopoly game was designed to demonstrate the problems with capitalism","truthValue":"True"},
  {"statementText":"Charlie Chaplin once lost a Charlie Chaplin lookalike contest","truthValue":"True"},

  // Technology & Inventions
  {"statementText":"Thomas Edison invented the light bulb","truthValue":"False"},
  {"statementText":"The first computer programmer in history was a woman","truthValue":"True"},
  {"statementText":"The cigarette lighter was invented before the friction match","truthValue":"True"},
  {"statementText":"The microwave oven was invented accidentally when a radar engineer noticed his chocolate bar melting","truthValue":"True"},
  {"statementText":"The first webcam was created to monitor a coffee pot","truthValue":"True"},

  // Religion & Mythology
  {"statementText":"The Bible specifically identifies the forbidden fruit in Eden as an apple","truthValue":"False"},
  {"statementText":"The iron maiden was a common medieval torture device","truthValue":"False"},
  {"statementText":"Buddha is traditionally depicted as overweight because he lived a life of excess","truthValue":"False"},
  {"statementText":"The three wise men in the Christmas story are named in the Bible","truthValue":"False"},
  {"statementText":"Ancient Egyptian pharaohs were commonly mummified with their organs placed in separate jars","truthValue":"True"},
  {"statementText":"The word 'assassin' derives from a group of medieval killers who used hashish","truthValue":"True"},

  // Human Body & Medicine
  {"statementText":"Humans have five distinct senses","truthValue":"False"},
  {"statementText":"Blood in your veins is blue until it is exposed to oxygen","truthValue":"False"},
  {"statementText":"Humans swallow an average of eight spiders per year while sleeping","truthValue":"False"},
  {"statementText":"The acid in your stomach is strong enough to dissolve razor blades","truthValue":"True"},
  {"statementText":"Humans are bioluminescent but the light is too faint for our eyes to detect","truthValue":"True"},

  // Space & Astronomy
  {"statementText":"There is a permanent dark side of the Moon that never receives sunlight","truthValue":"False"},
  {"statementText":"A day on Mercury is longer than a year on Mercury","truthValue":"True"},
  {"statementText":"Neutron stars are so dense that a teaspoon would weigh about 6 billion tons","truthValue":"True"},
  {"statementText":"The footprints left by Apollo astronauts on the Moon will likely remain visible for millions of years","truthValue":"True"},

];





export const defaultVectorStore = {
  id: "",
  name: "",
};
