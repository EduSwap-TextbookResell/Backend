import Test from '../models/test.model.js';

async function get(req, res, next) {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch (err) {
    console.error(`Error while getting test`, err.message);
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const test = await Test.create(req.body);
    res.status(201).json(test);
  } catch (err) {
    console.error(`Error while creating test`, err.message);
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const updatedTest = await Test.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedTest) {
      return res.status(404).json({ message: 'Test not found' });
    }
    res.json(updatedTest);
  } catch (err) {
    console.error(`Error while updating test`, err.message);
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const deletedTest = await Test.findByIdAndDelete(req.params.id);
    if (!deletedTest) {
      return res.status(404).json({ message: 'Test not found' }); // Handle if test not found
    }
    res.json({ message: 'Test deleted successfully' });
  } catch (err) {
    console.error(`Error while deleting test`, err.message);
    next(err);
  }
}

export default {
  get,
  create,
  update,
  remove,
};
