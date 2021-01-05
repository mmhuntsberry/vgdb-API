CREATE TABLE games (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  release_year INT NOT NULL,
  box_art VARCHAR(255) NOT NULL,
  synopsis TEXT,
);