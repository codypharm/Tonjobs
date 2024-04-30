const express = require("express");
const { StatusCodes } = require("http-status-codes");
const Tasks = require("../models/TaskModel");

// create task
const createTask = async (req, res) => {
  try {
    // create user
    const game = await Games.create({ ...req.body });

    const data = {
      _id: game._id,
      name: game.name,
      chain: game.chain,
      image: game.image,
      categories: game.categories,
    };
    // tslint:disable-next-line:no-console
    console.log(data);

    // send response
    res.status(StatusCodes.CREATED).json({
      user: data,
    });
  } catch (error) {
    // throw error
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

module.exports = {
  createTask,
};
