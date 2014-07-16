/**
 * Created by Eran_Amar on 7/16/14.
 * Target: to build a BTree with stateless functions which operates upon it.
 *         starting with array of random numbers - build a binary search tree (don't
 *         have to be balanced).
 */

var numberOfElements = 7;
var randElementsArr = _.shuffle(_.range(numberOfElements));

function Node(val, right, left) {
    this.val = val;
    this.right = right;
    this.left = left;
}

function BTree() {
    this.root; // starting with undefined root. will be defined upon first insert.
}

function chooseChild(node, val){
    return (node.val < val) ? 'right' : 'left';
}

function insertNode(tree, newVal) {
    function recursInsert(destParentNode) {
        var childStr = chooseChild(destParentNode, newVal);
        setChildOrAdvance(destParentNode, childStr, newVal)
    }
    function setChildOrAdvance(destParentNode, childStr, newVal){
        if (destParentNode[childStr]){
            recursInsert(destParentNode[childStr]);
        } else {
            destParentNode[childStr] = new Node(newVal);
        }
    }
    setChildOrAdvance(tree, 'root', newVal);
}

// print the binary tree to console (not graphical!)
function printTree(tree) {
    function printNode(node) {
        var left = (node.left) ? node.left.val : '#';
        var right = (node.right) ? node.right.val : '#';
        console.log('left(' + left + ') < (' + node.val + ') < right(' + right + ')');
    }

    function recursPrint(node) {
        if (node) {
            printNode(node);
            recursPrint(node.right);
            recursPrint(node.left);
        }
    }
    recursPrint(tree.root);
}

var tree = new BTree();
_.forEach(randElementsArr, _.partial(insertNode,tree));
printTree(tree);