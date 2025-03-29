import Node from "./Node.mjs";
import Queue from "../queue/Queue.mjs";

export default class Tree {
  constructor(array) {
    array = [...new Set(array)].sort((a, b) => a - b);
    this.root = this.buildTree(array, 0, array.length - 1);
  }

  buildTree(array, left, right) {
    if (left > right) return null;

    let mid = Math.trunc((left + right) / 2);
    const root = new Node(array[mid]);

    root.left = this.buildTree(array, left, mid - 1);
    root.right = this.buildTree(array, mid + 1, right);

    return root;
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  insert(value) {
    this.root = this.#insert(this.root, value);
  }

  #insert(node = this.root, value) {
    if (node === null) {
      return new Node(value);
    }

    if (node.data === value) {
      console.log("Value already exists");
      return;
    }

    if (value < node.data) {
      node.left = this.#insert(node.left, value);
    } else {
      node.right = this.#insert(node.right, value);
    }

    return node;
  }

  deleteItem(value) {
    this.root = this.#deleteItem(this.root, value);
  }

  #getSuccessor(curr) {
    curr = curr.right;
    while (curr != null && curr.left !== null) {
      curr = curr.left;
    }
    return curr;
  }

  #deleteItem(node, value) {
    if (node === null) {
      return node;
    }

    if (node.data > value) {
      node.left = this.#deleteItem(node.left, value);
    } else if (node.data < value) {
      node.right = this.#deleteItem(node.right, value);
    } else {
      // Case 1: no children/only right child
      if (node.left === null) {
        return node.right;
      }

      // Case 2: there exists only left child
      if (node.right === null) {
        return node.left;
      }

      // Case 3: has both children
      const successor = this.#getSuccessor(node);
      node.data = successor.data;
      node.right = this.#deleteItem(node.right, successor.data);
    }

    return node;
  }

  find(value) {
    return this.#find(this.root, value);
  }

  #find(root = this.root, value) {
    if (root === null) {
      return false;
    }

    if (root.data === value) {
      return true;
    }

    if (root.data > value) {
      return this.#find(root.left, value);
    } else {
      return this.#find(root.right, value);
    }
  }

  levelOrder(callback) {
    if (!callback) {
      throw new Error("Callback argument required");
    }

    this.#levelOrder(this.root, callback);
  }

  #levelOrder(root, callback) {
    if (root === null) {
      return null;
    }
    const queue = new Queue();
    queue.enqueue(root);

    while (!queue.isEmpty()) {
      const current = queue.peek();
      callback(current);

      if (current.left !== null) {
        queue.enqueue(current.left);
      }
      if (current.right !== null) {
        queue.enqueue(current.right);
      }

      queue.dequeue();
    }
  }

  inOrder(callback) {
    if (!callback) {
      throw new Error("Callback argument required");
    }

    this.#inOrder(this.root, callback);
  }

  #inOrder(root, callback) {
    if (root === null) {
      return null;
    }

    // Left -> root -> right
    this.#inOrder(root.left, callback);
    callback(root);
    this.#inOrder(root.right, callback);
  }

  preOrder(callback) {
    if (!callback) {
      throw new Error("Callback argument required");
    }

    this.#preOrder(this.root, callback);
  }

  #preOrder(root, callback) {
    if (root === null) {
      return null;
    }

    // Root -> left -> right
    callback(root);
    this.#preOrder(root.left, callback);
    this.#preOrder(root.right, callback);
  }

  postOrder(callback) {
    if (!callback) {
      throw new Error("Callback argument required");
    }

    return this.#postOrder(this.root, callback);
  }

  #postOrder(root, callback) {
    if (root == null) {
      return null;
    }

    // Left -> right -> root
    this.#postOrder(root.left, callback);
    this.#postOrder(root.right, callback);
    callback(root);
  }

  height(node) {
    if (node === null) {
      // counting the edges, not the nodes, so return -1; if counting node, return 0
      return -1;
    }
    return Math.max(this.height(node.left), this.height(node.right)) + 1;
  }

  depth(node) {
    return this.#depth(this.root, node);
  }

  #depth(root, targetNode, counter = 0) {
    if (root === null) {
      return -1;
    }

    if (root === targetNode) {
      return counter;
    }

    const leftDepth = this.#depth(root.left, targetNode, counter + 1);
    if (leftDepth !== -1) return leftDepth;

    return this.#depth(root.right, targetNode, counter + 1);
  }

  isBalanced() {
    let isBalanced = true;

    function heightChecker(root) {
      if (root === null) return 0;

      const leftHeight = heightChecker(root.left);
      if (isBalanced === false) {
        return;
      }
      const rightHeight = heightChecker(root.right);
      if (Math.abs(leftHeight - rightHeight) > 1) {
        isBalanced = false;
        return;
      }

      return Math.max(leftHeight, rightHeight) + 1;
    }

    heightChecker(this.root);
    return isBalanced;
  }

  rebalance() {
    const arr = [];
    this.inOrder((element) => {
      arr.push(element.data);
    });
    
    this.root = this.buildTree(arr, 0, arr.length - 1);
  }
}
