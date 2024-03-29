import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Alert,
  FlatList,
  useWindowDimensions,
} from "react-native";
import Title from "../components/ui/Title";
import { Ionicons } from "@expo/vector-icons";
import PrimeryButton from "../components/ui/PrimaryButton";
import NumberContainer from "../components/game/NumberContainer";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundery = 100;

function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);
  const { width } = useWindowDimensions();
  let content;

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundery = 100;
  }, []);

  function nextGuessHandler(direction) {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "You Know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      maxBoundery = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundery,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
    setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds]);
  }
  const guessRoundsListLength = guessRounds.length;

  if (width > 500) {
    content = (
      <>
        <View style={styles.buttonContainerWide}>
          <View style={styles.buttonContainer}>
            <PrimeryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimeryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.buttonContainer}>
            <PrimeryButton onPress={nextGuessHandler.bind(this, "greater")}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimeryButton>
          </View>
        </View>
      </>
    );
  } else {
    content = (
      <>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card>
          <InstructionText style={styles.instractionText}>
            Higher or lower?
          </InstructionText>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <PrimeryButton onPress={nextGuessHandler.bind(this, "lower")}>
                <Ionicons name="md-remove" size={24} color="white" />
              </PrimeryButton>
            </View>
            <View style={styles.buttonContainer}>
              <PrimeryButton onPress={nextGuessHandler.bind(this, "greater")}>
                <Ionicons name="md-add" size={24} color="white" />
              </PrimeryButton>
            </View>
          </View>
        </Card>
      </>
    );
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={styles.listContainer}>
        {/* {guessRounds.map((guessRound) => (
          <Text key={guessRound}>{guessRound}</Text>
        ))} */}
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundsListLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: "center",
  },
  instractionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  buttonContainerWide: {
    flexDirection: "row",
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
