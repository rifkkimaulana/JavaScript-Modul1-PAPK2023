document.addEventListener("DOMContentLoaded", function () {
    const cartItemCountElement = document.getElementById("CountItemKeranjang");

    const cartItems = JSON.parse(localStorage.getItem("keranjang")) || [];
    const cartItemCount = cartItems.length;

    cartItemCountElement.innerText = cartItemCount.toString();
});