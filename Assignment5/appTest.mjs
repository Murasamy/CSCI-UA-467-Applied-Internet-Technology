import express from 'express';
import Review from './db.mjs';
import mongoose from 'mongoose';

Review.find({}).then(users => console.log(users));

