import { makeExecutableSchema } from "@graphql-tools/schema";

const albums = [
  {
    title_id: 1,
    artist: "AC/DC",
    description:
      "For Those About To Rock We Salute You is a classic album by AC/DC that showcases their hard rock sound and includes hits like 'Let's Get It Up' and the title track.",
  },
  {
    title_id: 2,
    artist: "Accept",
    description:
      "Balls to the Wall is a heavy metal classic from Accept, featuring the powerful vocals of Udo Dirkschneider and iconic tracks like 'Balls to the Wall' and 'London Leatherboys'.",
  },
  {
    title_id: 3,
    artist: "Accept",
    description:
      "Restless and Wild is a seminal album in the history of heavy metal, with Accept's unique blend of heavy riffs and catchy melodies on full display. Standout tracks include 'Fast as a Shark' and 'Princess of the Dawn'.",
  },
  {
    title_id: 4,
    artist: "AC/DC",
    description:
      "Let There Be Rock is a high-energy album from AC/DC, featuring classic tracks like 'Whole Lotta Rosie' and the title track. The album is a must-listen for fans of hard rock and heavy metal.",
  },
  {
    title_id: 5,
    artist: "Aerosmith",
    description:
      "Big Ones is a compilation album from Aerosmith, featuring some of their biggest hits from the 1980s and 1990s, including 'Janie's Got a Gun' and 'Crazy'. The album is a great introduction to the band's music for new fans.",
  },
  {
    title_id: 6,
    artist: "Alanis Morissette",
    description:
      "Jagged Little Pill is the breakthrough album from Alanis Morissette, featuring raw and emotional songs like 'You Oughta Know' and 'Ironic'. The album's impact on pop culture cannot be overstated.",
  },
  {
    title_id: 7,
    artist: "Alice In Chains",
    description:
      "Facelift is the debut album from Alice In Chains, showcasing their unique blend of grunge, metal, and hard rock. Standout tracks include 'Man in the Box' and 'Bleed the Freak'.",
  },
  {
    title_id: 8,
    artist: "Antônio Carlos Jobim",
    description:
      "Warner 25 Anos is a compilation album from Brazilian jazz legend Antônio Carlos Jobim, featuring some of his most iconic songs like 'Garota de Ipanema' and 'Desafinado'. The album is a must-listen for fans of bossa nova and jazz.",
  },
  {
    title_id: 9,
    artist: "Apocalyptica",
    description:
      "Plays Metallica By Four Cellos is a unique album from Finnish cello rock band Apocalyptica, featuring instrumental covers of Metallica songs. The album's innovative approach to heavy metal has made it a cult classic.",
  },
  {
    title_id: 10,
    artist: "Audioslave",
    description:
      'The Audioslave album is the eponymous debut studio album by American rock supergroup Audioslave, released on November 19, 2002. The album is characterized by the band\'s signature heavy sound and features several successful singles, including "Cochise" and "Like a Stone."',
  },
];

const typeDefinitions = /* GraphQL */ `
  type Query {
    album(title_id: Int!): Album
  }

  type Album {
    title_id: Int!
    title: String
    artist: String
    description: String
  }
`;

const resolvers = {
  Query: {
    album: (parent: any, { title_id }: { title_id: number }) => {
      const album = albums.find((a) => a.title_id === title_id);
      return album || null;
    },
  },
};

export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions],
});
