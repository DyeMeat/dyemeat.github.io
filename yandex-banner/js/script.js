document.addEventListener("DOMContentLoaded", function () {
    const parent = document.querySelector(".products");
    const items = document.querySelectorAll(".products__item");
    const cartHitbox = document.querySelector(".cart__hitbox");
    const btn = document.querySelector(".btn");
    let productsInCart = 0;
  
    items.forEach((item) => {
      const offsetXInitial =
        parseFloat(item.style.left) || parseFloat(getComputedStyle(item).left);
      const offsetYInitial =
        parseFloat(item.style.top) || parseFloat(getComputedStyle(item).top);
      let isDragging = false;
      let offsetX = 0;
      let offsetY = 0;
  
      const startDrag = (event) => {
        item.classList.add("active");
        isDragging = true;
        const clientX = event.touches ? event.touches[0].clientX : event.clientX;
        const clientY = event.touches ? event.touches[0].clientY : event.clientY;
        offsetX = clientX - item.getBoundingClientRect().left;
        offsetY = clientY - item.getBoundingClientRect().top;
      };
  
      const drag = (event) => {
        if (!isDragging) return;
  
        let clientX = event.touches ? event.touches[0].clientX : event.clientX;
        let clientY = event.touches ? event.touches[0].clientY : event.clientY;
  
        let parentRect = parent.getBoundingClientRect();
        let blockRect = item.getBoundingClientRect();
  
        let x =
          Math.min(
            Math.max(parentRect.left, clientX - offsetX),
            parentRect.right - blockRect.width
          ) - parentRect.left;
  
        let y =
          Math.min(
            Math.max(parentRect.top, clientY - offsetY),
            parentRect.bottom - blockRect.height
          ) - parentRect.top;
  
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
      };
  
      const isOverlapping = (rect1, rect2) => {
        return (
          rect1.left < rect2.right &&
          rect1.right > rect2.left &&
          rect1.top < rect2.bottom &&
          rect1.bottom > rect2.top
        );
      };
  
      const endDrag = () => {
        isDragging = false;
        item.classList.remove("active");
        const itemRect = item.getBoundingClientRect();
        const cartRect = cartHitbox.getBoundingClientRect();
        const parentRect = parent.getBoundingClientRect();
  
        if (isOverlapping(itemRect, cartRect)) {
          let i = Math.round(parseFloat(item.style.left));
          let j = cartRect.left - parentRect.left;
          let leftValue = Math.max(i, j);
  
          item.style.left = `${leftValue}px`;
          item.style.top = "auto";
          item.style.bottom = `48px`;
          item.classList.add("in-cart");
          productsInCart++;
          checkBtnCondition(productsInCart);
        } else {
          item.style.left = `${offsetXInitial}px`;
          item.style.top = `${offsetYInitial}px`;
        }
      };
  
      item.addEventListener("mousedown", startDrag);
      item.addEventListener("touchstart", startDrag);
  
      item.addEventListener("mousemove", drag);
      item.addEventListener("touchmove", drag);
  
      item.addEventListener("mouseup", endDrag);
      item.addEventListener("touchend", endDrag);
    });
  
    function checkBtnCondition(count) {
      if (count >= 3) {
        btn.classList.add("active");
      }
    }
  });
  