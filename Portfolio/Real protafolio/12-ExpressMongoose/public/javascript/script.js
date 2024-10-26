const driverDiv = e.target.parentElement;
document.querySelector(".saveBtn").addEventListener("click", async () => {
    const forename = driverDiv.querySelector('input[name="forename"]').value;
    const surname = driverDiv.querySelector('input[name="surname"]').value;
    const id = e.target.dataset.id; 
  
    
    const driverId = new mongoose.Types.ObjectId(id);
  
    await fetch(`/driver/${driverId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ forename, surname }),
    });
    location.reload();
  });