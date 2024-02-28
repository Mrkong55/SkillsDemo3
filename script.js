// validation code//
function validateForm() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    
    let nameError = document.getElementById('nameError');
    let emailError = document.getElementById('emailError');
    
    let valid = true;
  
    if (name === '') {
      nameError.textContent = 'Name is required';
      valid = false;
    } else {
      nameError.textContent = '';
    }
  
    if (email === '') {
      emailError.textContent = 'Email is required';
      valid = false;
    } else if (!validateEmail(email)) {
      emailError.textContent = 'Invalid email format';
      valid = false;
    } else {
      emailError.textContent = '';
    }
  
    return valid;
  }
  
  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  // Image Cycling//
  let currentImageIndex = 0;
  const images = document.querySelectorAll('.image-container img');
  const totalImages = images.length;
  
  function cycleImages() {
      images[currentImageIndex].style.display = 'none';
      
      currentImageIndex = (currentImageIndex + 1) % totalImages;
  
      images[currentImageIndex].style.display = 'block';
  }
  
  setInterval(cycleImages, 500); // Change image every 1.5 seconds
  
// Image Gallery//
const galleryImages = document.querySelectorAll('#slider img');
const gallery = document.getElementById('gallery');

function openGallery() {
  gallery.style.display = 'block';
}

function closeGallery() {
  gallery.style.display = 'none';
}

galleryImages.forEach(image => {
  image.addEventListener('click', () => {
    openGallery();
    const galleryThumbnails = document.querySelectorAll('.gallery img');
    galleryThumbnails.forEach((thumbnail, index) => {
      thumbnail.src = galleryImages[index].src;
      thumbnail.alt = galleryImages[index].alt;
      // Set custom width and height for the thumbnails
      thumbnail.style.width = '50px'; // Adjust width as needed
      thumbnail.style.height = 'auto'; // Maintain aspect ratio
    });
  });
});
// calcultor //

// Function to update total
function updateTotal() {
    var itemList = document.getElementById('item-list').getElementsByTagName('li');
    var total = 0;
    for (var i = 0; i < itemList.length; i++) {
      var price = parseFloat(itemList[i].textContent.match(/\$\d+(?:\.\d+)?/)[0].slice(1));
      total += price;
    }
    document.getElementById('total').textContent = '$' + total.toFixed(2);
  }
  
  // Function to add item
  function addItem() {
    var itemName = document.getElementById('itemName').value;
    var itemPrice = parseFloat(document.getElementById('itemPrice').value);
  
    if (!itemName || isNaN(itemPrice)) {
      alert("Please enter valid item name and price.");
      return;
    }
  
    var itemList = document.getElementById('item-list');
    var li = document.createElement("li");
    li.textContent = itemName + ': $' + itemPrice.toFixed(2);
    itemList.appendChild(li);
  
    updateTotal();
  
    // Clear input fields
    document.getElementById('itemName').value = "";
    document.getElementById('itemPrice').value = "";
  }

  // open new window
  function openTab(url) {
    let win = window.open(url, "_blank");
    win.focus();
  }

  // sliding panels//
  const panelContainer = document.querySelector('.panel-container');
  const panels = document.querySelectorAll('.panel');
  const panelWidth = panels[0].offsetWidth;
  const containerWidth = panelContainer.offsetWidth;
  
  let currentPosition = containerWidth;
  
  function slidePanels() {
      currentPosition -= 1;
      panelContainer.style.transform = `translateX(${currentPosition}px)`;
  
      // Check if the panels have moved completely into view
      if (currentPosition <= 0) {
          resetPanelsPosition();
      }
  }
  
  function resetPanelsPosition() {
      currentPosition = containerWidth; // Reset currentPosition to container width
      panelContainer.style.transition = 'none'; // Disable transition for instant reset
      panelContainer.style.transform = `translateX(${currentPosition}px)`; // Move panels back to the right edge
  
      // Re-enable transition after reset
      setTimeout(() => {
          panelContainer.style.transition = '';
      }, 50);
  }
  
  setInterval(slidePanels, 1);
  

  // ajax scritp//

  // Function to make an AJAX request
function loadContent(url, callback) {
  var xhr = new XMLHttpRequest(); // Create a new XMLHttpRequest object

  // Configure the request
  xhr.open("GET", url, true);

  // Set up the onload event handler
  xhr.onload = function () {
      if (xhr.status === 200) {
          // If the request is successful, call the callback function with the response text
          callback(xhr.responseText);
      } else {
          // If the request fails, log the error
          console.error('Request failed. Status code: ' + xhr.status);
      }
  };

  // Set up the onerror event handler
  xhr.onerror = function () {
      // Log the error if the request fails
      console.error('Request failed');
  };

  // Send the request
  xhr.send();
}

// Function to update the content on the webpage
function updateContent(content) {
  // Get the element where you want to display the content
  var ajaxContent = document.getElementById('ajax-content');

  // Update the content of the element
  ajaxContent.innerHTML = content;
}

// Example usage: Load content from a server-side script and update the webpage
loadContent('example.php', updateContent);


// table code//

document.getElementById('add-item').addEventListener('click', function() {
  var table = document.getElementById('item-table').getElementsByTagName('tbody')[0];
  var newRow = table.insertRow(table.rows.length);
  var cell1 = newRow.insertCell(0);
  var cell2 = newRow.insertCell(1);
  cell1.innerHTML = '<input type="text" class="item-name" placeholder="Item">';
  cell2.innerHTML = '<input type="number" class="item-price" placeholder="Price" min="0">';
});

document.addEventListener('input', function(event) {
  if (event.target.classList.contains('item-price')) {
    calculateTotal();
  }
});

function calculateTotal() {
  var total = 0;
  var prices = document.querySelectorAll('.item-price');
  prices.forEach(function(price) {
    if (price.value) {
      total += parseFloat(price.value);
    }
  });
  document.getElementById('total').textContent = 'Total: $' + total.toFixed(2);
}
// more table code

document.addEventListener("DOMContentLoaded", function() {
  fetch('/api/users')
      .then(response => response.json())
      .then(data => {
          displayResultsAsTable(data);
          displayResultsAsList(data);
      })
      .catch(error => console.error('Error fetching data:', error));

  function displayResultsAsTable(data) {
      const tableBody = document.getElementById('tableBody');
      data.forEach(row => {
          const tr = document.createElement('tr');
          tr.innerHTML = `<td>${row.id}</td><td>${row.name}</td><td>${row.age}</td>`;
          tableBody.appendChild(tr);
      });
  }

  function displayResultsAsList(data) {
      const resultList = document.getElementById('resultsList');
      data.forEach(row => {
          const li = document.createElement('li');
          li.textContent = `ID: ${row.id}, Name: ${row.name}, Age: ${row.age}`;
          resultList.appendChild(li);
      });
  }
});


// ajax code

document.addEventListener("DOMContentLoaded", function() {
  var updateButton = document.getElementById("update-button");
  var dataContainer = document.getElementById("data-container");

  // Add event listener to the update button
  updateButton.addEventListener("click", function() {
    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Configure the request
    xhr.open("GET", "data.php", true);

    // Define the callback function when the request completes
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        // Update the data container with the retrieved data
        dataContainer.innerHTML = xhr.responseText;
      } else {
        console.error("Request failed with status: " + xhr.status);
      }
    };

    // Send the request
    xhr.send();
  });
});
