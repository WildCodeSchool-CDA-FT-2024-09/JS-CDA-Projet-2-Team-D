import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useQuery } from "@apollo/client";
import { GET_EXERCISES } from "../schema/queries";

type Exercise = {
  id: number;
  label: string;
  start_date: string;
  end_date: string;
};

type ExerciseContextType = {
  currentExercise: Exercise | null;
  setCurrentExercise: (exercise: Exercise | null) => void;
};

const ExerciseContext = createContext<ExerciseContextType | undefined>(
  undefined,
);

export const useExercise = () => {
  const context = useContext(ExerciseContext);
  if (!context)
    throw new Error("useExercise must be used within ExerciseProvider");
  return context;
};

export const ExerciseProvider = ({ children }: { children: ReactNode }) => {
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);

  const { data, loading, error } = useQuery(GET_EXERCISES);

  useEffect(() => {
    if (!currentExercise && data?.getExercises?.length > 0) {
      setCurrentExercise(data.getExercises[0]);
    }
  }, [data, currentExercise]);

  return (
    <ExerciseContext.Provider value={{ currentExercise, setCurrentExercise }}>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error loading exercises</div>
      ) : (
        children
      )}
    </ExerciseContext.Provider>
  );
};
