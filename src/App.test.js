import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import Board from './Board'
import Leaderboard from './Leaderboard'

test("login display shows once logged in", () => {
  const result = render(<App />);
  
  const loginButtonElement = screen.getByText('Login');
  expect(loginButtonElement).toBeInTheDocument();
  fireEvent.click(loginButtonElement);
  expect(loginButtonElement).not.toBeInTheDocument();
});

test("X or O shows up on the correct square after clicking", () => {
  const { rerender } = render(<Board PlayerX={'s1'} PlayerO={'s2'} Spectators={[]} username={'s1'}/>);
  
  const cellElement = screen.getAllByRole('presentation');
  
  fireEvent.click(cellElement[0]);
  expect(cellElement[0]).toHaveTextContent('X');
  
  rerender(<Board PlayerX={'s1'} PlayerO={'s2'} Spectators={[]} username={'s2'}/>)
  fireEvent.click(cellElement[3]);
  expect(cellElement[3]).toHaveTextContent('O');
  
  rerender(<Board PlayerX={'s1'} PlayerO={'s2'} Spectators={[]} username={'s1'}/>)
  fireEvent.click(cellElement[8]);
  expect(cellElement[8]).toHaveTextContent('X');
});

test("Leaderboard shows up when button it clicked", () => {
  const result = render(<App />);
  
  const loginButtonElement = screen.getByText('Login');
  expect(loginButtonElement).toBeInTheDocument();
  fireEvent.click(loginButtonElement);
  expect(loginButtonElement).not.toBeInTheDocument();
  
  const showLeaderboardButtonElement = screen.getByText("Show Leaderboard");
  expect(showLeaderboardButtonElement).toBeInTheDocument();
  fireEvent.click(showLeaderboardButtonElement);
  expect(showLeaderboardButtonElement).not.toBeInTheDocument();
  
});
