let balance = 2000;
let pay = 1500;

let tookLoan = false;

let laptops = [
    {
      id: 1,
      title: "Hp Spectre",
      price: "5000",
      imagelink: "images/hpspectre.png",
      features: [
        "Hella expensive",
        "Terrible customer service",
        "Looks good though..",
      ],
    },
    {
      id: 2,
      title: "Chrome Book",
      price: "500",
      imagelink: "images/chromebook.png",
      features: [
        "Nice as doorstop",
        "Needs internet connection to work",
        "Lightweight",
      ],
    },
    {
      id: 3,
      title: "Dell XPS 8300",
      price: "10000",
      imagelink: "images/dellxps8300.png",
      features: [
        "Quaranteed at least 10 years of life",
        "Not really a laptop",
        "You can play sims",
      ],
    },
    {
      id: 4,
      title: "ThinkPad T460",
      price: "8000",
      imagelink: "images/thinkpad.png",
      features: [
        "Really good performance",
        "Easy to use",
        "Looks kinda ugly and has a random Fn button where the Ctrl button should be",
      ],
    },
  ];

$(document).ready(function () {
  setBalance(balance);
  setPay(pay);

  laptops.forEach((laptop) => {
    $("#laptopselect").append(
      `<option value="${laptop.id}">${laptop.title}</option>`
    );
  });

  //    Show features         NOT DONE - Need too remove <li> elements before adding new ones (on both)
  $("#laptopselect").on("change", function () {
    let selected = $("#laptopselect").val();

    laptops.forEach((laptop) => {
        if (laptop.id == selected){
            document.getElementById('laptitle').innerHTML = laptop.title;
            document.getElementById('price').innerHTML = 'Price: ' + laptop.price + 'kr';
            document.getElementById('laptopImage').src = laptop.imagelink;

            $('li').remove();

            let ft = laptop.features;
           ft.forEach((feature) => {
                $("#feat").append(`<li><small>${feature}</small></li>`);
                $('#featList').append(`<li><small>${feature}</small></li>`)
              });
        }
    })
  });

  //  LOAN                    BUG - Can't increase balance after first increase unless you do something else inbetween
  $("#modalSubmit").click(function () {
    let amount = document.getElementById("amount").value;
    document.getElementById("amount").value = "";
    
    if (amount <= (balance * 2) && tookLoan == false) {
      balance += parseInt(amount);
      setBalance(balance);
      tookLoan = true;
      alert('Successfully took a loan!');
    } else {
        alert('The loan can not exeed your bank balance times 2.')
    }
    $("#loanModal").modal("hide");
  });

  // TRANSFER PAY TO BANK
  $("#bank").click(function () {
    alert('Transfered ' + pay + 'kr to your bank account.');
    balance += pay;
    pay = 0;

    setBalance(balance);
    setPay(pay);
  });

  // WORK TO INCREASE PAY
  $("#work").click(function () {
    pay += 100;

    setPay(pay);
  });

  // BUY LAPTOP
  $('#buy').click(function () {
    let laptopId = $("#laptopselect").val();
    laptops.forEach((laptop) => {
        if (laptop.id == laptopId){
            if (parseInt(laptop.price) <= balance) {
                alert('Congratulations! You bought it!');
                balance -= parseInt(laptop.price);
                setBalance(balance);
                tookLoan = false;
            } else {
                alert('Work more! You are short on cash..');
            } 
        }
    })
  })
});

let setBalance = (newBalance) => {
  balance = newBalance;
  document.getElementById("balance").innerHTML =
    "Balance: " + newBalance + "kr";
};

let setPay = (newPay) => {
  pay = newPay;
  document.getElementById("pay").innerHTML = "Pay: " + newPay + "kr";
};
