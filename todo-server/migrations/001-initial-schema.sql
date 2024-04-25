-- Up

    CREATE TABLE tasks(
        id INTEGER PRIMARY KEY,
        todotask STRING
    );

-- Down

    DROP TABLE tasks;