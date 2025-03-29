import Tree from "./binary-search-tree/Tree.mjs";

function driver() {
  function printTreeOrder() {
    // Logs list of elements in level-order (breadth first)
    const levelOrder = [];
    tree.levelOrder((element) => {
      levelOrder.push(element.data);
    });
    console.log("Level-Order: " + levelOrder);

    // Logs list of elements in pre-order (depth first)
    const preOrder = [];
    tree.preOrder((element) => {
      preOrder.push(element.data);
    });
    console.log("Pre-order " + preOrder);

    // Logs list of elements in post-order (depth first)
    const postOrder = [];
    tree.postOrder((element) => {
      postOrder.push(element.data);
    });
    console.log("Post-order " + postOrder);

    // Logs list of elements in in-order (depth first)
    const inOrder = [];
    tree.inOrder((element) => {
      inOrder.push(element.data);
    });
    console.log("In-order: " + inOrder);
  }

  function unbalanceTree(tree, numberCount, minNumber, maxNumber) {
    for (let i = 0; i < numberCount; i++) {
      tree.insert(getRandomBetween(minNumber, maxNumber));
    }
  }

  function getRandomBetween(min, max) {
    if (min > max) {
      throw new Error(
        "Minimum value must be less than or equal to the maximum value."
      );
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function arrayOfRandomNumbers(arrayLength, minNumber, maxNumber) {
    const arr = [];
    for (let i = 0; i < arrayLength; i++) {
      arr.push(getRandomBetween(minNumber, maxNumber));
    }
    return arr;
  }

  console.log("Creating tree...");
  const arr = arrayOfRandomNumbers(20, 1, 100);
  const tree = new Tree(arr);
  tree.prettyPrint();

  // Check if tree is balanced
  console.log("Tree is balanced: " + tree.isBalanced());

  // Prints tree in different orders
  printTreeOrder();

  // Unbalances tree
  console.log();
  console.log("Unbalancing tree...");
  unbalanceTree(tree, 10, 100, 200);
  tree.prettyPrint();
  console.log("Tree is balanced: " + tree.isBalanced());

  // Rebalances tree
  console.log();
  console.log("Rebalancing tree...");
  tree.rebalance();
  tree.prettyPrint();
  console.log("Tree is balanced: " + tree.isBalanced());
  printTreeOrder();
}

driver();
