import { Dimensions } from "react-native";

export const categoryList = [
  {
    name: "Popular",
    outline: require("assets/images/category-item/star-outline.png"),
    solid: require("assets/images/category-item/star-solid.png"),
  },
  {
    name: "Chair",
    outline: require("assets/images/category-item/chair-outline.png"),
    solid: require("assets/images/category-item/chair-solid.png"),
  },
  {
    name: "Table",
    outline: require("assets/images/category-item/desk-outline.png"),
    solid: require("assets/images/category-item/desk-solid.png"),
  },
  {
    name: "Armchair",
    outline: require("assets/images/category-item/couch-outline.png"),
    solid: require("assets/images/category-item/couch-solid.png"),
  },
  {
    name: "Bed",
    outline: require("assets/images/category-item/bed-outline.png"),
    solid: require("assets/images/category-item/bed-solid.png"),
  },
  {
    name: "Lamb",
    outline: require("assets/images/category-item/lamp-outline.png"),
    solid: require("assets/images/category-item/lamp-solid.png"),
  },
];
export const itemList = [
  {
    name: "Black Simple Lamp",
    price: "12.00",
    image: require("assets/images/demo-item/lamb.png"),
  },
  {
    name: "Minimal Stand",
    price: "25.00",
    image: require("assets/images/demo-item/stand.png"),
  },
  {
    name: "Coffee Chair",
    price: "20.00",
    image: require("assets/images/demo-item/chair.png"),
  },
  {
    name: "Simple Desk",
    price: "50.00",
    image: require("assets/images/demo-item/desk.png"),
  },
  {
    name: "Coffee Table",
    price: "50.00",
    image: require("assets/images/demo-item/table.png"),
  },
  {
    name: "Umbrella Stand",
    price: "10.00",
    image: require("assets/images/demo-item/umbrella-stand.png"),
  },
  {
    name: "Angolo Espresso Sofa",
    price: "120.00",
    image: require("assets/images/demo-item/sofa.png"),
  },
];

export const notificationList = [
  {
    title: "Your order #123456789 has been confirmed",
    image: require("assets/images/demo-item/umbrella-stand.png"),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis pretium et in arcu adipiscing nec. Turpis pretium et in arcu adipiscing nec. ",
    status: "New",
  },
  {
    title: "Your order #123456789 has been canceled",
    image: require("assets/images/demo-item/table.png"),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis pretium et in arcu adipiscing nec. Turpis pretium et in arcu adipiscing nec. ",
  },
  {
    title: "Discover hot sale furnitures this week.",
    content:
      "Lorem ipsum dolor sit amet, consectetur asdasdasdasdadipiscing elit. Turpis pretium et in arcu adipiscing nec. Turpis pretium et in arcu adipiscing nec. Turpis pretium et in arcu adipiscing nec. ",
    status: "HOT!",
  },
  {
    title: "Your order #123456789 has been shipped successfully",
    image: require("assets/images/demo-item/table.png"),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis pretium et in arcu adipiscing nec. Turpis pretium et in arcu adipiscing nec. ",
  },
  {
    title: "Your order #125456789 has been confirmed",
    image: require("assets/images/demo-item/lamb.png"),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis pretium et in arcu adipiscing nec. Turpis pretium et in arcu adipiscing nec. ",
  },
  {
    title: "Your order #1254567123 has been confirmed",
    image: require("assets/images/demo-item/desk.png"),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis pretium et in arcu adipiscing nec. Turpis pretium et in arcu adipiscing nec. ",
  },
];

export const profileCategoryList = [
  {
    name: "My orders",
    title: "Already have 10 orders",
    screen: "ShippingScreen",
  },
  {
    name: "Shipping Addresses",
    title: "03 Addresses",
    screen: "ShippingScreen",
  },
  {
    name: "Payment Method",
    title: "You have 2 cards",
    screen: "PaymentMethodScreen",
  },
  {
    name: "My reviews",
    title: "Reviews for 5 items",
    screen: "MyReviewScreen",
  },
  {
    name: "Setting",
    title: "Notification, Password, FAQ, Contact",
    screen: "ShippingScreen",
  },
];

export const addressList = [
  {
    name: "Trần Long Phú",
    address: "25 rue Robert Latouche, Nice, 06200, Côte D’azur, France",
  },
  {
    name: "Fu Long Tran",
    address: "25 rue Robert Latouche, Nice, 06200, Côte D’azur, France",
  },
  {
    name: "Fu Tran Loong",
    address: "25 rue Robert Latouche, Nice, 06200, Côte D’azur, France",
  },
];

export const creditCard = [
  {
    number: "5412 4242 4242 4242",
    name: "Tran Long Phu",
    expiryDate: "05/23",
  },
  {
    number: "4242 4242 4242 4242",
    name: "Tran Long Phu",
    expiryDate: "05/23",
  },
];

export const card = {
  "4": require("assets/images/visa.png"),
  "5": require("assets/images/mastercard.png"),
};

export const cardStyle = {
  "4": {
    height: (Dimensions.get("window").height * 1.97) / 100,
    width: (Dimensions.get("window").height * 6.15) / 100,
    marginBottom: (Dimensions.get("window").height * 3.277) / 100,
  },
  "5": {
    height: (Dimensions.get("window").height * 3) / 100,
    width: (Dimensions.get("window").height * 3.82) / 100,
    marginBottom: (Dimensions.get("window").height * 2.25) / 100,
  },
};

export const myRating = [
  {
    id: 1,
    product: "Coffee Table",
    image: require("assets/images/demo-item/table.png"),
    price: "50.00",
    rating: 5,
    date: "20/03/2020",
    review:
      "Nice Furniture with good delivery. The delivery time is very fast. Then products look like exactly the picture in the app. Besides, color is also the same and quality is very good despite very cheap price",
  },
  {
    id: 2,
    product: "Coffee Table",
    image: require("assets/images/demo-item/table.png"),
    price: "50.00",
    rating: 4.5,
    date: "22/03/2020",
    review:
      "Nice Furniture with good delivery. The delivery time is very fast. Then products look like exactly the picture in the app. Besides, color is also the same and quality is very good despite very cheap price",
  },
  {
    id: 3,
    product: "Coffee Table",
    image: require("assets/images/demo-item/table.png"),
    price: "50.00",
    rating: 5,
    date: "20/03/2020",
    review:
      "Nice Furniture with good delivery. The delivery time is very fast. Then products look like exactly the picture in the app. Besides, color is also the same and quality is very good despite very cheap price",
  },
];

export const myCart = [
  {
    id: 1,
    name: "Coffee Table",
    image: require("assets/images/demo-item/table.png"),
    price: "50.00",
    quantity: 2,
  },
  {
    id: 2,
    name: "Umbrella Stand",
    image: require("assets/images/demo-item/umbrella-stand.png"),
    price: "10.00",
    quantity: 2,
  },
  {
    id: 3,
    name: "Black Simple Lamp",
    image: require("assets/images/demo-item/lamb.png"),
    price: "12.00",
    quantity: 4,
  },
];

export const product = {
  name: "Minimal Stand",
  price: 50,
  rating: 4.5,
  reviews: 50,
  description:
    "Minimal Stand is made of by natural wood. The design that is very simple and minimal. This is truly one of the best furnitures in any family for now. With 3 different colors, you can easily select the best match for your home. ",
  colors: ["#ffffff", "#B4916C", "#E4CBAD"],
  images: [
    require("assets/images/demo-item/stand.png"),
    require("assets/images/demo-item/stand.png"),
    require("assets/images/demo-item/stand.png"),
  ],
};

export const checkOutInfo = [
  {
    title: "Shipping Address",
    name: "Trần Long Phú",
    address: "25 rue Robert Latouche, Nice, 06200, Côte D’azur, France",
  },
  {
    title: "Payment",
    number: '5412 4242 4242 4242',
  },
  {
    title: 'Delivery method',
    name: 'Ahamove',
    type: 'Fast (2-3 days)'
  },
  {
    order: '95.00',
    delivery: '5.00',
    total: '100.00'
  }
];
