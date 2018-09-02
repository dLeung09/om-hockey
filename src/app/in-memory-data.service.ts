import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const schedule = [
            { id: 0, date: 'May 2, 2018 07:00:00', gameType: 'league', arena: 0,
                awayTeam: 1, awayScore: 7, homeTeam: 2, homeScore: 6 },
            { id: 1, date: 'May 4, 2018 07:00:00', gameType: 'league', arena: 0,
                awayTeam: 3, awayScore: 4, homeTeam: 4, homeScore: 9 },
            { id: 2, date: 'May 7, 2018 07:00:00', gameType: 'league', arena: 0,
                awayTeam: 2, awayScore: 7, homeTeam: 3, homeScore: 9 },
            { id: 3, date: 'May 9, 2018 07:00:00', gameType: 'league', arena: 0,
                awayTeam: 4, awayScore: 7, homeTeam: 1, homeScore: 7 },
            { id: 4, date: 'May 11, 2018 07:00:00', gameType: 'league', arena: 0,
                awayTeam: 1, awayScore: 8, homeTeam: 3, homeScore: 10 },
            { id: 60, date: 'August 23 07:00:00', gameType: 'playoff', arena: 1,
                awayTeam: 4, awayScore: null, homeTeam: 1, homeScore: null },
            { id: 61, date: 'August 27 07:00:00', gameType: 'playoff', arena: 3,
                awayTeam: 2, awayScore: null, homeTeam: 3, homeScore: null },
            { id: 62, date: 'August 30 07:00:00', gameType: 'playoff', arena: 1,
                awayTeam: null, awayScore: null, homeTeam: null, homeScore: null }

        ];

        const teams = [
            { id: 0, name: "Spare list", players: [] },
            { id: 1, name: "Sean & Gord's Gang", players: [] },
            { id: 2, name: "Luc's Leeds & Grenvillers", players: [] },
            { id: 3, name: "Cliff's 27's", players: [] },
            { id: 4, name: "Keith's Torys", players: [] },
        ];

        const players = [
            { id: 0, name: 'Russell Whitlock', team: 1, gamesPlayedSeason: 32, goalsSeason: 93, assistsSeason: 39, pointsSeason: 132, penaltiesSeason: 2, gamesPlayedCareer: 225, goalsCareer: 501, assistsCareer: 253, pointsCareer: 754, penatiesCareer: 21, active: true },
            { id: 1, name: 'David Leung', team: 2, gamesPlayedSeason: 30, goalsSeason: 57, assistsSeason: 36, pointsSeason: 93, penaltiesSeason: 1, gamesPlayedCareer: 93, goalsCareer: 175, assistsCareer: 119, pointsCareer: 294, penaltiesCareer: 3, active: true },
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
