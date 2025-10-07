import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  GamepadIcon, 
  Trophy, 
  Star, 
  Play, 
  RotateCcw,
  Zap,
  Target,
  Brain,
  Puzzle,
  Timer,
  Award
} from "lucide-react";

interface Game {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  points: number;
  color: string;
}

export function GameZone() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [userPoints, setUserPoints] = useState(1250);
  const [achievements, setAchievements] = useState([
    { name: "First Win", icon: Trophy, earned: true },
    { name: "Speed Demon", icon: Zap, earned: true },
    { name: "Puzzle Master", icon: Puzzle, earned: false },
    { name: "Brain Champion", icon: Brain, earned: false },
  ]);

  const games: Game[] = [
    {
      id: "memory-match",
      name: "Memory Match",
      description: "Match pairs of cards to improve memory and concentration",
      icon: Brain,
      difficulty: 'Easy',
      category: 'Memory',
      points: 50,
      color: 'bg-blue-500'
    },
    {
      id: "word-puzzle",
      name: "Word Builder",
      description: "Create words from scrambled letters to enhance vocabulary",
      icon: Puzzle,
      difficulty: 'Medium',
      category: 'Language',
      points: 75,
      color: 'bg-green-500'
    },
    {
      id: "math-quest",
      name: "Math Quest",
      description: "Solve math problems in a fun adventure setting",
      icon: Target,
      difficulty: 'Medium',
      category: 'Mathematics',
      points: 100,
      color: 'bg-purple-500'
    },
    {
      id: "snake-ladders",
      name: "Snake & Ladders",
      description: "Classic board game with educational questions",
      icon: GamepadIcon,
      difficulty: 'Easy',
      category: 'Strategy',
      points: 60,
      color: 'bg-orange-500'
    },
    {
      id: "color-sequence",
      name: "Color Sequence",
      description: "Remember and repeat color patterns",
      icon: Star,
      difficulty: 'Hard',
      category: 'Memory',
      points: 120,
      color: 'bg-pink-500'
    },
    {
      id: "speed-math",
      name: "Speed Math",
      description: "Quick math challenges against the clock",
      icon: Zap,
      difficulty: 'Hard',
      category: 'Mathematics',
      points: 150,
      color: 'bg-red-500'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Memory Match Game Component
  const MemoryMatchGame = () => {
    const [cards, setCards] = useState<string[]>([]);
    const [flipped, setFlipped] = useState<number[]>([]);
    const [matched, setMatched] = useState<number[]>([]);
    const [score, setScore] = useState(0);
    const [moves, setMoves] = useState(0);
    const [gameWon, setGameWon] = useState(false);

    const symbols = ['🌟', '🎯', '🎨', '🎪', '🎭', '🎪', '🎨', '🎯', '🌟', '🎵', '🎵', '🎮'];

    useEffect(() => {
      initializeGame();
    }, []);

    const initializeGame = () => {
      const shuffled = [...symbols].sort(() => Math.random() - 0.5);
      setCards(shuffled);
      setFlipped([]);
      setMatched([]);
      setScore(0);
      setMoves(0);
      setGameWon(false);
    };

    const flipCard = (index: number) => {
      if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

      const newFlipped = [...flipped, index];
      setFlipped(newFlipped);

      if (newFlipped.length === 2) {
        setMoves(moves + 1);
        
        if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
          setMatched([...matched, ...newFlipped]);
          setScore(score + 10);
          setFlipped([]);
          
          if (matched.length + 2 === cards.length) {
            setGameWon(true);
            setUserPoints(userPoints + 50);
          }
        } else {
          setTimeout(() => setFlipped([]), 1000);
        }
      }
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <div className="text-center">
              <p className="text-lg font-bold">{score}</p>
              <p className="text-sm text-muted-foreground">Score</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">{moves}</p>
              <p className="text-sm text-muted-foreground">Moves</p>
            </div>
          </div>
          <Button variant="telkom-outline" onClick={initializeGame}>
            <RotateCcw className="w-4 h-4" />
            New Game
          </Button>
        </div>

        {gameWon && (
          <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
            <Trophy className="w-12 h-12 text-green-600 mx-auto mb-2" />
            <h3 className="text-xl font-bold text-green-800">Congratulations!</h3>
            <p className="text-green-700">You won in {moves} moves! +50 points earned.</p>
          </div>
        )}

        <div className="grid grid-cols-4 gap-3">
          {cards.map((symbol, index) => (
            <button
              key={index}
              onClick={() => flipCard(index)}
              className={`aspect-square text-2xl rounded-lg border-2 transition-all duration-300 ${
                flipped.includes(index) || matched.includes(index)
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card border-border hover:border-primary'
              }`}
            >
              {flipped.includes(index) || matched.includes(index) ? symbol : '?'}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Snake & Ladders Game Component
  const SnakeLaddersGame = () => {
    const [playerPosition, setPlayerPosition] = useState(1);
    const [diceValue, setDiceValue] = useState(1);
    const [isRolling, setIsRolling] = useState(false);
    const [gameMessage, setGameMessage] = useState("Click 'Roll Dice' to start!");
    const [questionsAnswered, setQuestionsAnswered] = useState(0);

    const snakes = { 16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78 };
    const ladders = { 1: 38, 4: 14, 9: 21, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100 };

    const rollDice = () => {
      if (isRolling) return;
      
      setIsRolling(true);
      setGameMessage("Rolling...");
      
      // Simulate dice rolling animation
      const rollAnimation = setInterval(() => {
        setDiceValue(Math.floor(Math.random() * 6) + 1);
      }, 100);

      setTimeout(() => {
        clearInterval(rollAnimation);
        const finalDice = Math.floor(Math.random() * 6) + 1;
        setDiceValue(finalDice);
        
        let newPosition = Math.min(playerPosition + finalDice, 100);
        
        // Check for snakes
        if (snakes[newPosition as keyof typeof snakes]) {
          newPosition = snakes[newPosition as keyof typeof snakes];
          setGameMessage(`Oh no! You hit a snake! Slide down to position ${newPosition}.`);
        }
        // Check for ladders
        else if (ladders[newPosition as keyof typeof ladders]) {
          newPosition = ladders[newPosition as keyof typeof ladders];
          setGameMessage(`Great! You found a ladder! Climb up to position ${newPosition}.`);
        }
        // Normal move
        else {
          setGameMessage(`You moved ${finalDice} spaces to position ${newPosition}.`);
        }

        setPlayerPosition(newPosition);
        setQuestionsAnswered(prev => prev + 1);
        
        if (newPosition === 100) {
          setGameMessage("🎉 Congratulations! You won the game! +60 points earned.");
          setUserPoints(prev => prev + 60);
        }
        
        setIsRolling(false);
      }, 1500);
    };

    const resetGame = () => {
      setPlayerPosition(1);
      setDiceValue(1);
      setGameMessage("Click 'Roll Dice' to start!");
      setQuestionsAnswered(0);
    };

    return (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-4 p-4 bg-muted rounded-lg">
            <div className="text-center">
              <p className="text-2xl font-bold">Position {playerPosition}</p>
              <p className="text-sm text-muted-foreground">Current Position</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white border-2 border-primary rounded-lg flex items-center justify-center text-2xl font-bold">
                {diceValue}
              </div>
              <p className="text-sm text-muted-foreground mt-1">Dice</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{questionsAnswered}</p>
              <p className="text-sm text-muted-foreground">Rolls</p>
            </div>
          </div>
          
          <p className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200 text-blue-800">
            {gameMessage}
          </p>
          
          <div className="flex gap-2 justify-center">
            <Button 
              variant="telkom" 
              onClick={rollDice} 
              disabled={isRolling || playerPosition === 100}
              className="min-w-32"
            >
              {isRolling ? (
                <>
                  <Timer className="w-4 h-4 animate-spin" />
                  Rolling...
                </>
              ) : (
                <>
                  <GamepadIcon className="w-4 h-4" />
                  Roll Dice
                </>
              )}
            </Button>
            <Button variant="telkom-outline" onClick={resetGame}>
              <RotateCcw className="w-4 h-4" />
              New Game
            </Button>
          </div>
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-10 gap-1 p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border">
          {Array.from({ length: 100 }, (_, i) => {
            const position = 100 - i; // Start from 100 and go down
            const isPlayer = position === playerPosition;
            const isSnake = snakes[position as keyof typeof snakes];
            const isLadder = ladders[position as keyof typeof ladders];
            
            return (
              <div
                key={position}
                className={`
                  aspect-square text-xs flex items-center justify-center rounded border
                  ${isPlayer ? 'bg-primary text-primary-foreground font-bold scale-110' : 'bg-white'}
                  ${isSnake ? 'bg-red-100 border-red-300' : ''}
                  ${isLadder ? 'bg-green-100 border-green-300' : ''}
                  ${!isPlayer && !isSnake && !isLadder ? 'border-gray-200' : ''}
                  transition-all duration-300
                `}
              >
                {isPlayer ? '👤' : position}
                {isSnake && !isPlayer && '🐍'}
                {isLadder && !isPlayer && '🪜'}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="telkom-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <GamepadIcon className="w-5 h-5" />
                Game Zone
              </CardTitle>
              <CardDescription>
                Fun and educational games to enjoy during break time. Earn points and unlock achievements!
              </CardDescription>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-2 text-primary">
                <Star className="w-5 h-5" />
                <span className="text-2xl font-bold">{userPoints.toLocaleString()}</span>
              </div>
              <p className="text-sm text-muted-foreground">Total Points</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {!selectedGame ? (
        <>
          {/* Game Selection */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <Card key={game.id} className="telkom-card telkom-card-hover cursor-pointer" onClick={() => setSelectedGame(game.id)}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className={`w-16 h-16 ${game.color} rounded-2xl flex items-center justify-center mx-auto`}>
                      <game.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-lg">{game.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{game.description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge className={getDifficultyColor(game.difficulty)}>
                        {game.difficulty}
                      </Badge>
                      <div className="flex items-center gap-1 text-primary">
                        <Star className="w-4 h-4" />
                        <span className="font-medium">{game.points}</span>
                      </div>
                    </div>
                    <Button variant="telkom" className="w-full">
                      <Play className="w-4 h-4" />
                      Play Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Achievements */}
          <Card className="telkom-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Achievements
              </CardTitle>
              <CardDescription>Unlock achievements by playing games and reaching milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border text-center transition-all duration-200 ${
                      achievement.earned 
                        ? 'bg-primary/10 border-primary text-primary' 
                        : 'bg-muted border-border text-muted-foreground'
                    }`}
                  >
                    <achievement.icon className={`w-8 h-8 mx-auto mb-2 ${achievement.earned ? 'text-primary' : 'text-muted-foreground'}`} />
                    <h4 className="font-medium">{achievement.name}</h4>
                    {achievement.earned && (
                      <Badge className="mt-2 bg-green-100 text-green-800">Earned!</Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Leaderboard */}
          <Card className="telkom-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Family Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Sophie", points: 2850, position: 1 },
                  { name: "Emma", points: 1890, position: 2 },
                  { name: "Liam", points: 1420, position: 3 }
                ].map((player) => (
                  <div key={player.name} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                        player.position === 1 ? 'bg-yellow-500' :
                        player.position === 2 ? 'bg-gray-400' : 'bg-orange-600'
                      }`}>
                        {player.position}
                      </div>
                      <span className="font-medium">{player.name}</span>
                    </div>
                    <div className="flex items-center gap-1 text-primary">
                      <Star className="w-4 h-4" />
                      <span className="font-bold">{player.points.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        /* Game Interface */
        <Card className="telkom-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button variant="telkom-outline" onClick={() => setSelectedGame(null)}>
                  ← Back to Games
                </Button>
                <div>
                  <CardTitle>{games.find(g => g.id === selectedGame)?.name}</CardTitle>
                  <CardDescription>{games.find(g => g.id === selectedGame)?.description}</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2 text-primary">
                <Star className="w-5 h-5" />
                <span className="font-bold">{userPoints.toLocaleString()}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {selectedGame === 'memory-match' && <MemoryMatchGame />}
            {selectedGame === 'snake-ladders' && <SnakeLaddersGame />}
            {selectedGame !== 'memory-match' && selectedGame !== 'snake-ladders' && (
              <div className="text-center py-12">
                <GamepadIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Coming Soon!</h3>
                <p className="text-muted-foreground">This game is under development. Try Memory Match or Snake & Ladders!</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}