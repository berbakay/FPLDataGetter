const { GetFplData } = require('../GetData/AddFPlDataToJson');

const testData = [{ "id": "239", "player_name": "Pascal Gro\u00df", "games": "1", "time": "90", "goals": "2", "xG": "1.2129968404769897", "assists": "0", "xA": "0.023503141477704048", "shots": "3", "key_passes": "1", "yellow_cards": "0", "red_cards": "0", "position": "D", "team_title": "Brighton", "npg": "2", "npxG": "1.2129968404769897", "xGChain": "1.3999220132827759", "xGBuildup": "0.18692520260810852" }, { "id": "773", "player_name": "Aleksandar Mitrovic", "games": "1", "time": "90", "goals": "2", "xG": "0.9116451144218445", "assists": "0", "xA": "0.04672102630138397", "shots": "3", "key_passes": "1", "yellow_cards": "0", "red_cards": "0", "position": "F", "team_title": "Fulham", "npg": "1", "npxG": "0.15047626197338104", "xGChain": "0.27609944343566895", "xGBuildup": "0.07890216261148453" }]


GetFplData(testData)