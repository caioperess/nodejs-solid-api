# App

GymPass style app

## RFs (Requisitos funcionais)

- [x] The user should be able to sign up;
- [x] The user should be able to login;
- [x] The system must allow the authenticated to get his profile;
- [x] The system must allow to get the amount of check-ins of an authenticated user;
- [x] The user should be able to get his check-ins history;
- [x] The user should be able to search for nearby gyms (max 10km);
- [x] The user should be able to search for gyms by name;
- [x] The user should be able to do a check-in in a gym;
- [x] The system must allow a gym to validate an user check-in;
- [x] The system must allow to register gyms;

## RNs (Regras de negócio)

- [x] The user should not be able to sign up with an existent email;
- [x] The user should not be able to do 2 check-ins in the same day;
- [x] The user should not be able to do a check-in if he is more than 100m far from the gym
- [x] The check-in can be validated up to 20 minutes after its creation;
- [x] The check-in can only be validated by administrators;
- [x] The gym can only be registered up by administrators;

## RNFs (Requisitos não funcionais)

- [x] The user password has to be encrypted;
- [x] The system data must be allocated in a PostgreSQL database;
- [x] All the system lists must be paginated with 20 items per page;
- [x] The user must be identified by a JWT token