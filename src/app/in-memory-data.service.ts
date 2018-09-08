import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const schedule = [
          {
            id: 0,
            date: 'May 2, 2018 07:00:00',
            gameType: 'league',
            arena: "Minto Recreation Complex - Barrhaven - North",
            awayTeam: "Sean & Gord's Gang",
            awayScore: 7,
            homeTeam: "Luc's Leeds & Grenvillers",
            homeScore: 6
          },
          {
            id: 1,
            date: 'May 4, 2018 07:00:00',
            gameType: 'league',
            arena: "Minto Recreation Complex - Barrhaven - North",
            awayTeam: "Cliff's 27's",
            awayScore: 4,
            homeTeam: "Keith's Torys",
            homeScore: 9
          },
          {
            id: 2,
            date: 'May 7, 2018 07:00:00',
            gameType: 'league',
            arena: "Minto Recreation Complex - Barrhaven - North",
            awayTeam: "Luc's Leeds & Grenvillers",
            awayScore: 7,
            homeTeam: "Cliff's 27's",
            homeScore: 9
          },
          {
            id: 3,
            date: 'May 9, 2018 07:00:00',
            gameType: 'league',
            arena: "Minto Recreation Complex - Barrhaven - North",
            awayTeam: "Keith's Torys",
            awayScore: 7,
            homeTeam: "Sean & Gord's Gang",
            homeScore: 7
          },
          {
            id: 4,
            date: 'May 11, 2018 07:00:00',
            gameType: 'league',
            arena: "Minto Recreation Complex - Barrhaven - North",
            awayTeam: "Sean & Gord's Gang",
            awayScore: 8,
            homeTeam: "Cliff's 27's",
            homeScore: 10
          },
          {
            id: 60,
            date: 'August 23 07:00:00',
            gameType: 'playoff',
            arena: "Walter Baker (Rink A)",
            awayTeam: "Keith's Torys",
            awayScore: null,
            homeTeam: "Sean & Gord's Gang",
            homeScore: null
          },
          {
            id: 61,
            date: 'August 27 07:00:00',
            gameType: 'playoff',
            arena: "Nepean Sportsplex - Arena 3 (Figure Skating Arena)",
            awayTeam: "Luc's Leeds & Grenvillers",
            awayScore: null,
            homeTeam: "Cliff's 27's",
            homeScore: null
          },
          {
            id: 62,
            date: 'August 30 07:00:00',
            gameType: 'playoff',
            arena: "Walter Baker (Rink A)",
            awayTeam: null,
            awayScore: null,
            homeTeam: null,
            homeScore: null
          }
        ];

        const teams = [
            { id: 0, name: "Spare list", players: [] },
            { id: 1, name: "Sean & Gord's Gang", players: [] },
            { id: 2, name: "Luc's Leeds & Grenvillers", players: [] },
            { id: 3, name: "Cliff's 27's", players: [] },
            { id: 4, name: "Keith's Torys", players: [] },
        ];

      const players = [
        {
          id: 0,
          name: 'Russell Whitlock',
          team: "Sean & Gord's Gang",
          gamesPlayedSeason: 32,
          goalsSeason: 93,
          assistsSeason: 39,
          pointsSeason: 132,
          penaltiesSeason: 2,
          gamesPlayedCareer: 225,
          goalsCareer: 501,
          assistsCareer: 253,
          pointsCareer: 754,
          penatiesCareer: 21,
          active: true
        },
        {
          id: 1,
          name: 'David Leung',
          team: "Luc's Leeds & Grenvillers",
          gamesPlayedSeason: 30,
          goalsSeason: 57,
          assistsSeason: 36,
          pointsSeason: 93,
          penaltiesSeason: 1,
          gamesPlayedCareer: 93,
          goalsCareer: 175,
          assistsCareer: 119,
          pointsCareer: 294,
          penaltiesCareer: 3,
          active: true
        }
      ];

        const arenas = [
            { id: 0, name: 'Minto Recreation Complex - Barrhaven - North' },
            { id: 1, name: 'Walter Baker (Rink A)' },
            { id: 2, name: 'Walter Baker (Rink B)' },
            { id: 3, name: 'Nepean Sportsplex - Arena 3 (Figure Skating Arena)' },
            { id: 4, name: 'Nepean Sportsplex - Arena 2 (At the back)' },
            { id: 5, name: 'Nepean Sportsplex - Arena 1 (Yzerman)' },
        ];

        return { schedule, teams, players };
    }
}
