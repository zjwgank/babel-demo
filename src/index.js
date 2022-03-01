/*
 * @Author: zhujinwang
 * @Date: 2022-02-25 16:10:23
 * @LastEditTime: 2022-03-01 15:12:45
 * @LastEditors: zhujinwang
 * @Description: babel插件
 * @可以输入预定的版权声明、个性签名、空行等
 */

export default function ({ types: t }) {
  return {
    pre() {
      // 声明一个全局变量
      this.cache = {};
    },
    visitor: {
      Program(path, state) {
        // 获取插件配置
        const {
          opts: { strict },
        } = state;
        const directives = path.get("directives");
        // 判断插件是否进行了严格声明
        let stricted = directives.some((item) =>
          t.isDirectiveLiteral(item.node.value, { value: "use strict" })
        );
        // 未严格声明 && 配置
        if (!stricted && strict) {
          path.node.directives.unshift(
            t.Directive(t.DirectiveLiteral("use strict"))
          );
        }
      },
      VariableDeclaration(path) {
        // 针对初始化变量进行变更
        const { node } = path;
        node.kind = "var";
        path.traverse({
          VariableDeclarator(path) {
            const {
              node: { init },
            } = path;
            if (!init) {
              path.node.init = t.identifier("undefined");
            }
          },
        });
      },
      // 表达式替换
      BinaryExpression(path) {
        const {
          node: { operator },
        } = path;
        if (operator !== "===") {
          return;
        }
        path.node.left = t.identifier("a");
        path.node.right = t.identifier("b");
      },
      // 函数参数变换
      FunctionDeclaration(path) {
        path.scope.rename("n", "x");
      },
      // 返回语句变换
      ReturnStatement(path) {
        path.replaceWithMultiple([
          t.expressionStatement(t.stringLiteral("Is this the real life?")),
          t.expressionStatement(t.stringLiteral("Is this just fantasy?")),
          t.expressionStatement(
            t.stringLiteral("(Enjoy singing the rest of the song in your head)")
          ),
        ]);
      },
    },
  };
}
