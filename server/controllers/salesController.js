const Sale = require('../models/Sale');

const getSalesData = async (req, res) => {
  try {
    const { branch, startDate, endDate } = req.body;
    const sales = await Sale.find({
      branch,
      date: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};

module.exports = { getSalesData };
