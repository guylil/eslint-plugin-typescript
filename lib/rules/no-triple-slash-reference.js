/**
 * @fileoverview Enforces triple slash references are not used.
 * @author Danny Fritz
 */
"use strict";

const util = require("../util");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: 'Disallow `/// <reference path="" />` comments',
            extraDescription: [util.tslintRule("no-reference")],
            category: "TypeScript"
        },
        schema: []
    },

    create(context) {
        const referenceRegExp = /^\/\s*<reference/;
        const sourceCode = context.getSourceCode();

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        /**
         * Checks if property has an accessibility modifier.
         * @param {ASTNode} program The node representing a Program.
         * @returns {void}
         * @private
         */
        function checkTripleSlashReference(program) {
            const leading = sourceCode.getComments(program).leading;

            leading.forEach(comment => {
                if (comment.type !== "Line") {
                    return;
                }
                if (referenceRegExp.test(comment.value)) {
                    context.report({
                        node: comment,
                        message: "Do not use a triple slash reference"
                    });
                }
            });
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------
        return {
            Program: checkTripleSlashReference
        };
    }
};
