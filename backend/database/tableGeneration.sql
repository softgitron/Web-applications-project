CREATE TABLE IF NOT EXISTS `chirpdb`.`users` (
  `userId` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `nickname` VARCHAR(20) NOT NULL,
  `profilePicture` CHAR(30) NULL,
  `visibility` TINYINT(4) NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE INDEX `nickname_UNIQUE` (`nickname` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);

CREATE TABLE IF NOT EXISTS `chirpdb`.`logins` (
  `token` VARCHAR(200) NOT NULL,
  `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `userId` INT(11) NOT NULL,
  PRIMARY KEY (`token`),
  INDEX `userId_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `userId`
    FOREIGN KEY (`userId`)
    REFERENCES `chirpdb`.`users` (`userId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS `chirpdb`.`posts` (
  `postId` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `title` VARCHAR(60) NOT NULL,
  `text` VARCHAR(160) NULL,
  `image` CHAR(60) NULL,
  `visibility` TINYINT NOT NULL,
  PRIMARY KEY (`postId`),
  INDEX `userId_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `userIdPosts`
    FOREIGN KEY (`userId`)
    REFERENCES `chirpdb`.`users` (`userId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS `chirpdb`.`friends` (
  `userId1` INT NOT NULL REFERENCES `users`,
  `userId2` INT NOT NULL REFERENCES `users`,
  `confirmed` TINYINT NOT NULL,
  PRIMARY KEY (`userId1`, `userId2`));

CREATE TABLE IF NOT EXISTS `chirpdb`.`notifications` (
  `notificationId` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `title` VARCHAR(30) NOT NULL,
  `text` VARCHAR(100) NOT NULL,
  `type` TINYINT NOT NULL,
  PRIMARY KEY (`notificationId`),
  INDEX `userIdNotifications_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `userIdNotifications`
    FOREIGN KEY (`userId`)
    REFERENCES `chirpdb`.`users` (`userId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

