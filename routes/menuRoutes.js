const express = require('express');
const router = express.Router();

const MenuItem = require('../models/MenuItem');

// post method to save menu item
router.post('/', async (req, res) => {
  try{
    const data = req.body;
    const menuItem = new MenuItem(data);
    const response = await menuItem.save();
    
    console.log("Menu saved successfully");
    res.status(200).send(response);
  }
  catch(error){
    console.log("Error : ", error);
    res.status(500).json({error: 'Internal server error'});
  }
});

// get method to get menu details
router.get('/', async (req, res) => {
  try{
    const menuData = await MenuItem.find();
    console.log("Menu items fetched successfully");
    res.status(200).json(menuData);
  }catch(error){
    console.log("Error : ", error);
    res.status(500).json({error: "Internal server error"});
  }
});

// Parametirised menu routes
router.get('/:tasteType', async (req, res) => {
  try {
    const tasteType = req.params.tasteType;
    if(tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sour'){
      const response = await MenuItem.find({taste: tasteType});
      res.status(200).json(response);
    }
    else{
      res.status(404).json({error: "Invalid taste type"});
    }
  } catch (error) {
    console.log("Error : ", error);
    res.status(500).json({error: "Internal Server Error"});
  }
})

module.exports = router;