import express from 'express';

const rootRoute = (req, res) => {
  res.send('TEST!');
};

export default (
  express
    .Router({
      strict: true,
    })
    .get('*', rootRoute)
);
