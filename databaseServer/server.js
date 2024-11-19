const DataStore = require('nedb');


const customer = new DataStore({filename:"db/myCustomer.db",autoload:true});
const store = new DataStore({filename:"db/myStore.db",autoload:true});
const saved = new DataStore({filename:"db/mySaved.db",autoload:true});
const supplier = new DataStore({filename:"db/mySupplier.db",autoload:true});
const expenses = new DataStore({filename:"db/myExpenses.db",autoload:true});
const client = new DataStore({filename:"db/myClient.db",autoload:true});
const clientSupply = new DataStore({filename:"db/myClientSupply.db",autoload:true});
const RecycleBin = new DataStore({filename:'db/myRecycleBin.db', autoload:true})
const RecycleBinExpen = new DataStore({filename:'db/myRecycleBinExpen.db', autoload:true})
const workerDays = new DataStore({filename:'db/myWorkerDays.db', autoload:true})




const user = new DataStore({filename:"db/myUser.db",autoload:true})

const partner = new DataStore({filename:'db/myPartner.db', autoload:true})
const login = new DataStore({filename:'db/myLogin.db', autoload:true})




const { ipcMain } = require("electron")


customer.loadDatabase();
store.loadDatabase();
saved.loadDatabase();
supplier.loadDatabase();
expenses.loadDatabase();
client.loadDatabase();
clientSupply.loadDatabase();
partner.loadDatabase();
user.loadDatabase();
login.loadDatabase();
RecycleBin.loadDatabase();
RecycleBinExpen.loadDatabase();
workerDays.loadDatabase();

console.log('server is running with database');



ipcMain.on('infoRegist',(e, args)=>{
  login.insert(args)
  e.sender.send('infoRegist',JSON.stringify(args))
  // console.log(newData)
})



ipcMain.on('get-login',(e,arg)=>{
  login.find({},(e,myLogin)=>{
    ipcMain.on('get-login', (e,da)=>{
      e.sender.send('get-login', JSON.stringify(myLogin))

    })
  })
})


ipcMain.on('allUsers',(e, args)=>{
    user.insert(args)
    e.sender.send('data-created',JSON.stringify(args))
    // console.log(newData)
})



ipcMain.on('myPartner',(e, args)=>{
  partner.insert({"myPartner":args})  
});

ipcMain.on('get-Partner',(e,arg)=>{
  partner.find({},(e,myPartner)=>{
    ipcMain.on('get-Partner', (e,da)=>{
      e.sender.send('get-Partner', JSON.stringify(myPartner))

    })
  })
})


ipcMain.on('update-Partner',(e,args)=>{
  partner.update({_id:args.tmp},{"Partner":args})
})


ipcMain.on('delete-Partner',(e,args)=>{
  partner.remove({_id:args},{},(e,dataRemove)=>{
  })
})


//customer

ipcMain.on('newCustomer',(e,id, myCustomer)=>{
  customer.insert({_id:id,"myCustomer":myCustomer}) 
});


ipcMain.on('get-customer',(e,arg)=>{
  customer.find({},(e,myClient)=>{
    ipcMain.on('get-customer', (e,da)=>{
      e.sender.send('get-customer', JSON.stringify(myClient))

    })
  })
})



ipcMain.on('update-customer',(e,args)=>{
  customer.update({_id:args.tmp},{'myCustomer':args})
})

ipcMain.on('update2-customer',(e,args)=>{
  customer.update({_id:args.tmp},{'myCustomer':args})
})

// Supp
ipcMain.on('update-customerSupply',(e,args)=>{
  customer.update({_id:args.tmpCustomer},{'myCustomer':args})
})

ipcMain.on('update2-customerSuppUpdate',(e,args)=>{
  customer.update({_id:args.tmp},{'myCustomer':args})
})



ipcMain.on('update2-customerSuppDelete',(e,args)=>{
  customer.update({_id:args.tmpIdDelete1},{'myCustomer':args})
})


ipcMain.on('update-customerRestoreSupp',(e,args)=>{
  customer.update({_id:args.id},{'myCustomer':args})
})

// exp

ipcMain.on('update-customerExpUpdate',(e,args)=>{
  customer.update({_id:args.tmpIdCustomerExp},{'myCustomer':args})
})


ipcMain.on('update-customerDeleteExp',(e,args)=>{
  customer.update({_id:args.tmpIdDeleteExp},{'myCustomer':args})
})

ipcMain.on('update-customerRestoreExp',(e,args)=>{
  customer.update({_id:args.id},{'myCustomer':args})
})



ipcMain.on('update3-customer',(e,args)=>{
  customer.update({_id:args.tmpIdCustomer},{'myCustomer':args})
})

ipcMain.on('update-customer',(e,args)=>{
  customer.update({_id:args.id},{'myCustomer':args})
})



ipcMain.on('delete-customer',(e,args)=>{
  customer.update({_id:args.id},{'myCustomer':args})
  
})





//................................................

//supplier

ipcMain.on('newSupplier',(e,id, mySupplier)=>{
  supplier.insert({_id:id,"mySupplier":mySupplier}) 
});


ipcMain.on('get-supplier',(e,arg)=>{
  supplier.find({},(e,mySupplier)=>{
    ipcMain.on('get-supplier', (e,da)=>{
      e.sender.send('get-supplier', JSON.stringify(mySupplier))

    })
  })
})



ipcMain.on('update-supplier',(e,args)=>{
  supplier.update({_id:args.tmp},{'mySupplier':args})
})

ipcMain.on('update2-supplier',(e,args)=>{
  supplier.update({_id:args.tmp},{'mySupplier':args})
})

// // Supp
ipcMain.on('update-supplierSupply',(e,args)=>{
  supplier.update({_id:args.tmpSupplier},{'mySupplier':args})
})

ipcMain.on('update2-supplierSuppUpdate',(e,args)=>{
  supplier.update({_id:args.tmp},{'mySupplier':args})
})



ipcMain.on('update2-supplierSuppDelete',(e,args)=>{
  supplier.update({_id:args.tmpIdDelete1},{'mySupplier':args})
})


ipcMain.on('update-supplierRestoreSupp',(e,args)=>{
  supplier.update({_id:args.id},{'mySupplier':args})
})

// // exp

ipcMain.on('update-supplierExpUpdate',(e,args)=>{
  supplier.update({_id:args.tmpIdCustomerExp},{'mySupplier':args})
})


ipcMain.on('update-supplierDeleteExp',(e,args)=>{
  supplier.update({_id:args.tmpIdDeleteExp},{'mySupplier':args})
})

ipcMain.on('update-supplierRestoreExp',(e,args)=>{
  supplier.update({_id:args.id},{'mySupplier':args})
})



ipcMain.on('update3-supplier',(e,args)=>{
  supplier.update({_id:args.tmpIdSupplier},{'mySupplier':args})
})

ipcMain.on('update-supplier',(e,args)=>{
  supplier.update({_id:args.id},{'mySupplier':args})
})



ipcMain.on('delete-supplier',(e,args)=>{
  supplier.update({_id:args.id},{'mySupplier':args})
  
})


//...............................................


ipcMain.on('myClient',(e,id, myClient)=>{
  client.insert({myClient}) 
});



ipcMain.on('get-client',(e,arg)=>{
  client.find({},(e,myClient)=>{
    ipcMain.on('get-client', (e,da)=>{
      e.sender.send('get-client', JSON.stringify(myClient))

    })
  })
})


ipcMain.on('update-client',(e,args)=>{
  client.update({_id:args.tmp},{'myClient':args})
})


ipcMain.on('update-clientDelet',(e,args)=>{
  client.update({_id:args.tmpIdDelete1},{'myClient':args})
})

ipcMain.on('update-clientOpen',(e,args)=>{
  client.update({_id:args.id},{'myClient':args})
})





ipcMain.on('delete-client',(e,args)=>{
  client.remove({_id:args},{},(e,dataRemove)=>{
  })
})





ipcMain.on('myClientSupply',(e,id, myClient)=>{
  clientSupply.insert({_id:id,"myClient":myClient}) 
});


ipcMain.on('get-clientSupply',(e,arg)=>{
  clientSupply.find({},(e,myClient)=>{
    ipcMain.on('get-clientSupply', (e,da)=>{
      e.sender.send('get-clientSupply', JSON.stringify(myClient))

    })
  })
})


ipcMain.on('update-clientSupply',(e,args)=>{
  clientSupply.update({_id:args.tmp},{'myClient':args})
})


ipcMain.on('update-clientDeletSupply',(e,args)=>{
  clientSupply.update({_id:args.tmpIdDelete1},{'myClient':args})
})

ipcMain.on('update-clientOpenSupply',(e,args)=>{
  clientSupply.update({_id:args.id},{'myClient':args})
})




ipcMain.on('delete-clientSupply',(e,args)=>{
  clientSupply.remove({_id:args},{},(e,dataRemove)=>{
  })
})



ipcMain.on('myRecycleBin',(e, myClient)=>{
  RecycleBin.insert({myClient}) 
});

// ---------------------------


ipcMain.on('myExpenses',(e,id, myExpenses)=>{
  expenses.insert({_id:id,"myExpenses":myExpenses}) 
});


ipcMain.on('get-expenses',(e,arg)=>{
  expenses.find({},(e,myExpenses)=>{
    ipcMain.on('get-expenses', (e,da)=>{
      e.sender.send('get-expenses', JSON.stringify(myExpenses))

    })
  })
})


ipcMain.on('update-expenses',(e,args)=>{
  expenses.update({_id:args.tmp},{'myExpenses':args})
})


ipcMain.on('update-expensesDelete',(e,args)=>{
  expenses.update({_id:args.tmpIdDelete1},{'myExpenses':args})
})

ipcMain.on('update-expenses',(e,args)=>{
  expenses.update({_id:args.id},{'myExpenses':args})
})



ipcMain.on('update-expensesOpen',(e,args)=>{
  expenses.update({_id:args.id},{'myExpenses':args})
})

ipcMain.on('delete-expenses',(e,args)=>{
  expenses.remove({_id:args},{},(e,dataRemove)=>{
  })
})


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


ipcMain.on('myItems',(e,id,args)=>{
  store.insert({_id:id,"myItems":args}) 
});



ipcMain.on('get-items',(e,arg)=>{
  store.find({},(e,newItems)=>{
    ipcMain.on('get-items', (e,da)=>{
      e.sender.send('get-items', JSON.stringify(newItems))

    })
  })
})



ipcMain.on('updateItems',(e,args)=>{
  store.update({_id:args.tmp},{'myItems':args})
})


ipcMain.on('delete-items',(e,args)=>{
  store.remove({_id:args},{},(e,dataRemove)=>{
  })
})
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


ipcMain.on('mySaved',(e,id,args)=>{
  saved.insert({_id:id,"mySaved":args}) 
});



ipcMain.on('get-saved',(e,arg)=>{
  saved.find({},(e,mySaved)=>{
    ipcMain.on('get-saved', (e,da)=>{
      e.sender.send('get-saved', JSON.stringify(mySaved))

    })
  })
})



ipcMain.on('update-saved',(e,args)=>{
  saved.update({_id:args.tmp},{'mySaved':args})
})


ipcMain.on('delete-saved',(e,args)=>{
  saved.remove({_id:args},{},(e,dataRemove)=>{
  })
})




//................................................


ipcMain.on('myWorkerDays',(e,id, mySuppliers)=>{
  workerDays.insert({_id:id,'mySuppliers':mySuppliers,})  
});


ipcMain.on('get-workerDays',(e,arg)=>{
  workerDays.find({},(e,mySuppliers)=>{
    ipcMain.on('get-workerDays', (e,da)=>{
      e.sender.send('get-workerDays', JSON.stringify(mySuppliers))

    })
  })
})


ipcMain.on('update-workerDays',(e,args)=>{
  workerDays.update({_id:args.tmp},args)
})


ipcMain.on('delete-workerDays',(e,args)=>{
  workerDays.remove({_id:args},{},(e,dataRemove)=>{
  })
})

//................................................

