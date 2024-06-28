const price = document.querySelector('.product__price-block-value');
const countBlocks = document.querySelectorAll(
  '.product__options-item-count-block',
);
const freeSauce = document.querySelector('.product__options-free-count');
const costs = document.querySelectorAll('.product__options-cost-value');

class Option {
  constructor(name, price) {
    this.name = name;
    this.price = price;
    this.count = 0;
    this.isFree = false;
  }

  add = () => {
    this.count++;
  };

  remove = () => {
    if (this.count !== 0) this.count--;
  };
}

class Options {
  addOption = (option) => {
    this[option.name] = option;
  };
  getCost = () => {
    return Object.values(this).reduce((sum, option) => {
      if (typeof option === 'object')
        return option.isFree
          ? sum + option.price * (option.count - 1)
          : sum + option.price * option.count;
      return 0;
    }, 0);
  };
  getCount = () => {
    return Object.values(this).reduce((sum, option) => {
      if (typeof option === 'object') return sum + option.count;
      return 0;
    }, 0);
  };
}

const ketchup = new Option('ketchup', 60);
const cheese = new Option('cheese', 60);
const blueCheese = new Option('blueCheese', 60);
const barbecue = new Option('barbecue', 60);

const options = new Options();

options.addOption(ketchup);
options.addOption(cheese);
options.addOption(blueCheese);
options.addOption(barbecue);

countBlocks.forEach((item) => {
  const minusButton = item.querySelector('.product__options-item-count-minus');
  const plusButton = item.querySelector('.product__options-item-count-plus');
  const count = item.querySelector('.product__options-item-count-value');
  const option = item.dataset.itemName;
  minusButton.addEventListener('click', () => {
    options[option].remove();
    if (options[option].count === 0) {
      minusButton.classList.add('product__options-item-count-minus_disable');
      options[option].isFree = false;
    }
    if (options.getCount() === 0) {
      freeSauce.textContent = 0;
      costs.forEach((item) => (item.textContent = 0));
    }
    if (options[option].isFree && options[option].count === 1) {
      item.previousElementSibling.querySelector(
        '.product__options-cost-value',
      ).textContent = 0;
    }
    count.textContent = options[option].count;
    price.textContent = options.getCost();
  });
  plusButton.addEventListener('click', () => {
    options[option].add();
    if (options[option].count === 1)
      minusButton.classList.remove('product__options-item-count-minus_disable');
    if (options.getCount() > 0) freeSauce.textContent = 1;
    if (options.getCount() === 1) {
      costs.forEach((item) => (item.textContent = 60));
      item.previousElementSibling.querySelector(
        '.product__options-cost-value',
      ).textContent = 0;
      options[option].isFree = true;
    }
    if (options[option].isFree && options[option].count === 2) {
      item.previousElementSibling.querySelector(
        '.product__options-cost-value',
      ).textContent = 60;
    }
    count.textContent = options[option].count;
    price.textContent = options.getCost();
  });
});
