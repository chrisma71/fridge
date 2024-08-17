import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface ProgressBarProps {
  calorieGoal: number;
  calorieIntake: number;
  proteinGoal: number;
  proteinIntake: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ calorieGoal, calorieIntake, proteinGoal, proteinIntake }) => {
  const caloriePercentage = (calorieIntake / calorieGoal) * 100;
  const proteinPercentage = (proteinIntake / proteinGoal) * 100;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
      <h2 className="text-2xl font-semibold mb-4 font-malti">Track your Progress</h2>
      <div className="flex justify-between items-center space-x-16">
        <div className="w-1/2 flex flex-col items-center">
          <CircularProgressbar
            value={caloriePercentage}
            text={`${calorieIntake}/${calorieGoal}`}
            styles={buildStyles({
              pathColor: '#00A36C',
              textColor: '#333',
              textSize: '16px', // Smaller font size for the text inside the circle
              trailColor: '#D9D9D9',
              backgroundColor: '#fff',
            })}
            className="font-malti" // Apply the Malti font to the text
          />
          <p className="mt-4 text-lg font-semibold font-malti">Calories</p>
        </div>
        <div className="w-1/2 flex flex-col items-center">
          <CircularProgressbar
            value={proteinPercentage}
            text={`${proteinIntake}/${proteinGoal}`}
            styles={buildStyles({
              pathColor: '#00A36C',
              textColor: '#333',
              textSize: '16px', // Smaller font size for the text inside the circle
              trailColor: '#D9D9D9',
              backgroundColor: '#fff',
            })}
            className="font-malti" // Apply the Malti font to the text
          />
          <p className="mt-4 text-lg font-semibold font-malti">Protein</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
