const DataStore = require('nedb');



const customerRecovery = new DataStore({filename:"dataRcovery/db/myCustomerRecovery.db",autoload:true})
const supplierRecovery = new DataStore({filename:"dataRcovery/db/mySupplierRecovery.db",autoload:true})
const savedRecovery = new DataStore({filename:"dataRcovery/db/mySavedRecovery.db",autoload:true})
const storeRecovery = new DataStore({filename:"dataRcovery/db/myStoreRecovery.db",autoload:true})
// const concrete = new DataStore({filename:"db/myConcrete.db",autoload:true})
// const buildings = new DataStore({filename:"db/myBuildings.db",autoload:true})
// const conch = new DataStore({filename:"db/myConch.db",autoload:true})
// const paintWork = new DataStore({filename:"db/myPaintWork.db",autoload:true})
// const Marblework = new DataStore({filename:"db/myMarblework.db",autoload:true})
// const Ceramicwork = new DataStore({filename:"db/myCeramicwork.db",autoload:true})
// const PlumbingWork = new DataStore({filename:"db/myPlumbingWork.db",autoload:true})
// const ElectricityWork = new DataStore({filename:"db/myElectricityWork.db",autoload:true})



const { ipcMain } = require("electron")



customerRecovery.loadDatabase();
supplierRecovery.loadDatabase();
savedRecovery.loadDatabase();
storeRecovery.loadDatabase();
// conch.loadDatabase();
// Marblework.loadDatabase();
// Ceramicwork.loadDatabase();
// PlumbingWork.loadDatabase();
// ElectricityWork.loadDatabase();


console.log('server is running with database');




// // dig

ipcMain.on('myCustomerRecoveryInsert',(e,id, mySuppliers)=>{
  customerRecovery.insert({_id:id,"myCustomer":mySuppliers}) 
 
});


ipcMain.on('myCustomerRecoveryUpdate',(e,args)=>{
  customerRecovery.update({_id:args.id},{"myCustomer":args})
})


ipcMain.on('mySupplierRecovery',(e, mySuppliers)=>{
  supplierRecovery.insert({"mySupplier":mySuppliers})  
});

ipcMain.on('myStoreRecovery',(e, mySuppliers)=>{
  storeRecovery.insert({"myItems":mySuppliers})  
});

ipcMain.on('mySavedRecovery',(e,id,args)=>{
  savedRecovery.insert({"mySaved":args}) 
});



// ipcMain.on('get-reportDig',(e,arg)=>{
//   dig.find({},(e,mySuppliers)=>{
//     ipcMain.on('get-reportDig', (e,da)=>{
//       e.sender.send('get-reportDig', JSON.stringify(mySuppliers))

//     })
//   })
// })

// ipcMain.on('update-reportDig',(e,args)=>{
//   dig.update({_id:args.tmpId},args)
// })
// ipcMain.on('update-reportDig',(e,args)=>{
//   dig.update({_id:args.id},{"mySuppliers":args})
// })


// ipcMain.on('delete-reportDig',(e,args)=>{
//   dig.remove({_id:args},{},(e,dataRemove)=>{
//   })
// })


// // Concrete

// ipcMain.on('myReportConcrete',(e, mySuppliers)=>{
//   concrete.insert({"mySuppliers":mySuppliers})  
// });


// ipcMain.on('get-reportConcrete',(e,arg)=>{
//   concrete.find({},(e,mySuppliers)=>{
//     ipcMain.on('get-reportConcrete', (e,da)=>{
//       e.sender.send('get-reportConcrete', JSON.stringify(mySuppliers))

//     })
//   })
// })

// ipcMain.on('update-reportConcrete',(e,args)=>{
//   concrete.update({_id:args.tmpId},args)
// })
// ipcMain.on('update-reportConcrete',(e,args)=>{
//   concrete.update({_id:args.id},{"mySuppliers":args})
// })


// ipcMain.on('delete-reportConcrete',(e,args)=>{
//   concrete.remove({_id:args},{},(e,dataRemove)=>{
//   })
// })


// // Buildings

// ipcMain.on('myReportBuildings',(e, mySuppliers)=>{
//   buildings.insert({"mySuppliers":mySuppliers})  
// });


// ipcMain.on('get-reportBuildings',(e,arg)=>{
//   buildings.find({},(e,mySuppliers)=>{
//     ipcMain.on('get-reportBuildings', (e,da)=>{
//       e.sender.send('get-reportBuildings', JSON.stringify(mySuppliers))

//     })
//   })
// })

// ipcMain.on('update-reportBuildings',(e,args)=>{
//   buildings.update({_id:args.tmpId},args)
// })
// ipcMain.on('update-reportBuildings',(e,args)=>{
//   buildings.update({_id:args.id},{"mySuppliers":args})
// })


// ipcMain.on('delete-reportBuildings',(e,args)=>{
//   buildings.remove({_id:args},{},(e,dataRemove)=>{
//   })
// })



// // conch

// ipcMain.on('myReportConch',(e, mySuppliers)=>{
//   conch.insert({"mySuppliers":mySuppliers})  
// });


// ipcMain.on('get-reportConch',(e,arg)=>{
//   conch.find({},(e,mySuppliers)=>{
//     ipcMain.on('get-reportConch', (e,da)=>{
//       e.sender.send('get-reportConch', JSON.stringify(mySuppliers))

//     })
//   })
// })

// ipcMain.on('update-reportConch',(e,args)=>{
//   conch.update({_id:args.tmpId},args)
// })
// ipcMain.on('update-reportConch',(e,args)=>{
//   conch.update({_id:args.id},{"mySuppliers":args})
// })


// ipcMain.on('delete-reportConch',(e,args)=>{
//   conch.remove({_id:args},{},(e,dataRemove)=>{
//   })
// })



// // paintWork

// ipcMain.on('myReportPaintWork',(e, mySuppliers)=>{
//   paintWork.insert({"mySuppliers":mySuppliers})  
// });


// ipcMain.on('get-reportPaintWork',(e,arg)=>{
//   paintWork.find({},(e,mySuppliers)=>{
//     ipcMain.on('get-reportPaintWork', (e,da)=>{
//       e.sender.send('get-reportPaintWork', JSON.stringify(mySuppliers))

//     })
//   })
// })

// ipcMain.on('update-reportPaintWork',(e,args)=>{
//   paintWork.update({_id:args.tmpId},args)
// })
// ipcMain.on('update-reportPaintWork',(e,args)=>{
//   paintWork.update({_id:args.id},{"mySuppliers":args})
// })


// ipcMain.on('delete-reportPaintWork',(e,args)=>{
//   paintWork.remove({_id:args},{},(e,dataRemove)=>{
//   })
// })



// // ceramicWork

// ipcMain.on('myReportCeramicwork',(e, mySuppliers)=>{
//   Ceramicwork.insert({"mySuppliers":mySuppliers})  
// });


// ipcMain.on('get-reportCeramicwork',(e,arg)=>{
//   Ceramicwork.find({},(e,mySuppliers)=>{
//     ipcMain.on('get-reportCeramicwork', (e,da)=>{
//       e.sender.send('get-reportCeramicwork', JSON.stringify(mySuppliers))

//     })
//   })
// })

// ipcMain.on('update-reportCeramicwork',(e,args)=>{
//   Ceramicwork.update({_id:args.tmpId},args)
// })
// ipcMain.on('update-reportCeramicwork',(e,args)=>{
//   Ceramicwork.update({_id:args.id},{"mySuppliers":args})
// })


// ipcMain.on('delete-reportCeramicwork',(e,args)=>{
//   Ceramicwork.remove({_id:args},{},(e,dataRemove)=>{
//   })
// })



// // MarbleWork

// ipcMain.on('myReportMarblework',(e, mySuppliers)=>{
//   Marblework.insert({"mySuppliers":mySuppliers})  
// });


// ipcMain.on('get-reportMarblework',(e,arg)=>{
//   Marblework.find({},(e,mySuppliers)=>{
//     ipcMain.on('get-reportMarblework', (e,da)=>{
//       e.sender.send('get-reportMarblework', JSON.stringify(mySuppliers))

//     })
//   })
// })

// ipcMain.on('update-reportMarblework',(e,args)=>{
//   Marblework.update({_id:args.tmpId},args)
// })
// ipcMain.on('update-reportMarblework',(e,args)=>{
//   Marblework.update({_id:args.id},{"mySuppliers":args})
// })


// ipcMain.on('delete-reportMarblework',(e,args)=>{
//   Marblework.remove({_id:args},{},(e,dataRemove)=>{
//   })
// })



// // PlumingWork

// ipcMain.on('myReportPlumbingWork',(e, mySuppliers)=>{
//   PlumbingWork.insert({"mySuppliers":mySuppliers})  
// });


// ipcMain.on('get-reportPlumbingWork',(e,arg)=>{
//   PlumbingWork.find({},(e,mySuppliers)=>{
//     ipcMain.on('get-reportPlumbingWork', (e,da)=>{
//       e.sender.send('get-reportPlumbingWork', JSON.stringify(mySuppliers))

//     })
//   })
// })

// ipcMain.on('update-reportPlumbingWork',(e,args)=>{
//   PlumbingWork.update({_id:args.tmpId},args)
// })
// ipcMain.on('update-reportPlumbingWork',(e,args)=>{
//   PlumbingWork.update({_id:args.id},{"mySuppliers":args})
// })


// ipcMain.on('delete-reportPlumbingWork',(e,args)=>{
//   PlumbingWork.remove({_id:args},{},(e,dataRemove)=>{
//   })
// })



// // ElectricityWork

// ipcMain.on('myReportElectricityWork',(e, mySuppliers)=>{
//   ElectricityWork.insert({"mySuppliers":mySuppliers})  
// });


// ipcMain.on('get-reportElectricityWork',(e,arg)=>{
//   ElectricityWork.find({},(e,mySuppliers)=>{
//     ipcMain.on('get-reportElectricityWork', (e,da)=>{
//       e.sender.send('get-reportElectricityWork', JSON.stringify(mySuppliers))

//     })
//   })
// })

// ipcMain.on('update-reportElectricityWork',(e,args)=>{
//   ElectricityWork.update({_id:args.tmpId},args)
// })
// ipcMain.on('update-reportElectricityWork',(e,args)=>{
//   ElectricityWork.update({_id:args.id},{"mySuppliers":args})
// })


// ipcMain.on('delete-reportElectricityWork',(e,args)=>{
//   ElectricityWork.remove({_id:args},{},(e,dataRemove)=>{
//   })
// })


