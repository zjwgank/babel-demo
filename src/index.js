/*
 * @Author: zhujinwang
 * @Date: 2022-02-25 16:10:23
 * @LastEditTime: 2022-02-28 17:52:38
 * @LastEditors: zhujinwang
 * @Description: babel插件
 * @可以输入预定的版权声明、个性签名、空行等
 */

export default function ({ types: t }) {
  return {
    visitor: {
      VariableDeclaration(path, state) {
        const {
          opts: { strict },
        } = state;
        const { node } = path;
        if (strict) {
          path.insertBefore(
            t.expressionStatement(t.stringLiteral("use strict"))
          );
        }
        node.kind = "var";
        path.traverse({
          VariableDeclarator(path) {
            path.node.init = t.identifier('undefined')
          },
        });
      },
    },
  };
}
