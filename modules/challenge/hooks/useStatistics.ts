import { useState, useMemo } from "react";

const useStatistics = (statistics) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [rxScore, setRxScore] = useState([]);
  const [topIngredients, setTopIngredients] = useState([]);

  useMemo(() => {
    setLeaderboard(
      statistics?.sharedWith.map((user) => ({
        id: user?.memberId?._id,
        name: user?.memberId?.displayName,
        profile: user?.memberId?.image,
        score: Math.round(user?.blendScore),
      })) || [],
    );
    setTopIngredients(
      statistics?.topIngredients.slice(0, 5).map((ing) => ({
        icon: ing?.ingredientId?.featuredImage || "https://freepngimg.com/thumb/mango/1-2-mango-png.png",
        label: ing?.ingredientId?.ingredientName,
        quantity: ing?.count,
      })) || [],
    );
  }, [statistics]);
  return { leaderboard, rxScore, topIngredients };
};

export default useStatistics;
