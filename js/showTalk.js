let win = null;

function showTalk_index(){
    if(win == null || win.closed)
        win = window.open("calling.html", "outWin", "width = 600, height = 600");
}

function showTalk_category(){
    if(win == null || win.closed)
        win = window.open("../calling.html", "outWin", "width = 600, height = 600");
}

function showNoEvent(){
    alert("현재 이벤트 준비 중에 있습니다.\n심려를 끼쳐 드려 죄송합니다.");
}

function soldOut(name){
    alert("현재 " + name + " 상품은 품절입니다.\n대단히 죄송합니다.");
}

function addBill_order(name, count, price){
    var totalPrice = JSON.parse(localStorage.getItem('총 금액'));
    var itemCount = JSON.parse(localStorage.getItem(name));
    if(totalPrice <= 0){
        totalPrice = 0;
    }

    totalPrice += price;
    localStorage.setItem('총 금액', String(totalPrice));

    if(itemCount <= 0){
        itemCount = 0;
    }
    else{
        itemCount = parseInt(localStorage.getItem(name));
    }
    itemCount+= count;

    localStorage.setItem(name, JSON.stringify(itemCount));

    alert(name + "메뉴를 " + count + "개 담았습니다.\n현재 주문표에 넣으신 메뉴의 총액은 " + totalPrice +"원입니다.");
}

function resetBill(){
    window.localStorage.clear();
}

function openBill_order(){
    if(win == null || win.closed)
        win = window.open("../../orderFood.html", "outWin", "width = 600, height = 800");
}

function openBill_category(){
    if(win == null || win.closed)
        win = window.open("../orderFood.html", "outWin", "width = 600, height = 800");
}

function openBill_index(){
    if(win == null || win.closed)
        win = window.open("orderFood.html", "outWin", "width = 600, height = 800");
}

class Accordion {
  constructor(el) {
    // Store the <details> element
    this.el = el;
    // Store the <summary> element
    this.summary = el.querySelector('summary');
    // Store the <div class="content"> element
    this.content = el.querySelector('.content');

    // Store the animation object (so we can cancel it if needed)
    this.animation = null;
    // Store if the element is closing
    this.isClosing = false;
    // Store if the element is expanding
    this.isExpanding = false;
    // Detect user clicks on the summary element
    this.summary.addEventListener('click', (e) => this.onClick(e));
  }

  onClick(e) {
    // Stop default behaviour from the browser
    e.preventDefault();
    // Add an overflow on the <details> to avoid content overflowing
    this.el.style.overflow = 'hidden';
    // Check if the element is being closed or is already closed
    if (this.isClosing || !this.el.open) {
      this.open();
    // Check if the element is being openned or is already open
    } else if (this.isExpanding || this.el.open) {
      this.shrink();
    }
  }

  shrink() {
    // Set the element as "being closed"
    this.isClosing = true;
    
    // Store the current height of the element
    const startHeight = `${this.el.offsetHeight}px`;
    // Calculate the height of the summary
    const endHeight = `${this.summary.offsetHeight}px`;
    
    // If there is already an animation running
    if (this.animation) {
      // Cancel the current animation
      this.animation.cancel();
    }
    
    // Start a WAAPI animation
    this.animation = this.el.animate({
      // Set the keyframes from the startHeight to endHeight
      height: [startHeight, endHeight]
    }, {
      duration: 400,
      easing: 'ease-out'
    });
    
    // When the animation is complete, call onAnimationFinish()
    this.animation.onfinish = () => this.onAnimationFinish(false);
    // If the animation is cancelled, isClosing variable is set to false
    this.animation.oncancel = () => this.isClosing = false;
  }

  open() {
    // Apply a fixed height on the element
    this.el.style.height = `${this.el.offsetHeight}px`;
    // Force the [open] attribute on the details element
    this.el.open = true;
    // Wait for the next frame to call the expand function
    window.requestAnimationFrame(() => this.expand());
  }

  expand() {
    // Set the element as "being expanding"
    this.isExpanding = true;
    // Get the current fixed height of the element
    const startHeight = `${this.el.offsetHeight}px`;
    // Calculate the open height of the element (summary height + content height)
    const endHeight = `${this.summary.offsetHeight + this.content.offsetHeight}px`;
    
    // If there is already an animation running
    if (this.animation) {
      // Cancel the current animation
      this.animation.cancel();
    }
    
    // Start a WAAPI animation
    this.animation = this.el.animate({
      // Set the keyframes from the startHeight to endHeight
      height: [startHeight, endHeight]
    }, {
      duration: 400,
      easing: 'ease-out'
    });
    // When the animation is complete, call onAnimationFinish()
    this.animation.onfinish = () => this.onAnimationFinish(true);
    // If the animation is cancelled, isExpanding variable is set to false
    this.animation.oncancel = () => this.isExpanding = false;
  }

  onAnimationFinish(open) {
    // Set the open attribute based on the parameter
    this.el.open = open;
    // Clear the stored animation
    this.animation = null;
    // Reset isClosing & isExpanding
    this.isClosing = false;
    this.isExpanding = false;
    // Remove the overflow hidden and the fixed height
    this.el.style.height = this.el.style.overflow = '';
  }
}

document.querySelectorAll('details').forEach((el) => {
  new Accordion(el);
});
