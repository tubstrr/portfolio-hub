<script>
// Libraries
import { h } from "vue";
// import { decode } from 'html-entities';

// Theme Imports
import { parser } from "@/utilities/parse";
import { decoder } from "@/utilities/decode";
import TLink from "@/components/theme/t-link.vue";

export default {
  props: {
    html: {
      type: String,
      required: false,
      default: "",
    },
    tag: {
      type: String,
      required: false,
      default: "div",
    },
    replacePTags: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props) {
    const parse = parser;
    const decode = decoder;

    // const swapCurlyQuotes = (html) => {
    //   return html.replaceAll("‘", "'").replaceAll("’", "'").replaceAll("“", '"').replaceAll("”", '"');
    // };

    // Server VS. Client Names
    const getName = (node) => {
      if (process.server) return node.rawTagName;
      if (process.client) return node.nodeName.toLowerCase();
    };

    const getAttributes = (node) => {
      if (process.server) return node.attributes;
      if (process.client) {
        const clean = {};
        Object.keys(node.attributes).map(
          (
            key,
          ) => (clean[node.attributes[key].name] = node.attributes[key].value),
        );
        return clean;
      }
    };

    const getClasses = (node) => {
      if (process.server) return Array.from(node.classList._set);
      else return [...node.classList];
    };

    const getText = (node) => {
      if (process.server) return decode(node._rawText);
      if (process.client) return decode(node.textContent);
    };

    // Return the #document-fragment as a array of h() Vue component's
    const walkFragment = (fragment) => {
      const elements = [];
      const nodes = fragment.childNodes || 0;

      for (let i = 0; i < nodes?.length; i++) {
        const node = nodes[i];

        // Is Element
        let tag = getName(node);
        if (node.nodeType === 1) {
          let html = node.innerHTML;

          // html = swapCurlyQuotes(html);
          const parseNode = parse(html);

          const content = { innerHTML: () => html };

          const classes = getClasses(node);

          let block = {
            tag,
            attributes: {
              class: classes,
            },
            content,
          };

          switch (tag) {
            case "iframe":
              block.attributes = getAttributes(node);
              break;
            case "a":
              block.tag = TLink;

              let url = node.getAttribute("href");

              block.attributes = {
                ...block.attributes,
                href: url,
                innerHTML: html,
              };

              block.content = "";
              break;
            case "p":
              if (props.replacePTags) {
                block.tag = "span";
              }
              if (parseNode.childElementCount === 0) {
                block.attributes.innerHTML = html;
                block.content = "";
              }
              break;
            case "em":
            case "i":
            case "strong":
            case "b":
            case "u":
            case "s":
            case "del":
            case "ins":
            case "mark":
            case "q":
            case "blockquote":
            case "code":
            case "pre":
            case "abbr":
            case "sub":
            case "sup":
            case "small":
            case "big":
            case "cite":
              block.attributes.innerHTML = html;
              block.content = "";
              break;
          }
          // Does the element have children?
          let hasChildren = parseNode.childElementCount >= 1;
          if (process.server) {
            hasChildren = node.childNodes.filter((node) =>
              node.nodeType !== 3
            ).length >= 1;
          }

          if (hasChildren) {
            if (typeof block.tag != "string") {
              elements.push(
                h(block.tag, block.attributes, () => walkFragment(parseNode)),
              );
            } else {
              elements.push(
                h(block.tag, block.attributes, walkFragment(parseNode)),
              );
            }
          } else {
            let HTMLFreeze = block.attributes.innerHTML;
            if (!HTMLFreeze && typeof block.content == "object") {
              HTMLFreeze = block.content.innerHTML();
            }
            if (!HTMLFreeze && typeof block.content == "string") {
              HTMLFreeze = block.content.innerHTML;
            }
            HTMLFreeze = decode(HTMLFreeze);
            delete block.attributes.innerHTML;

            if (typeof block.tag != "string") {
              elements.push(h(block.tag, block.attributes, () => HTMLFreeze));
            } else elements.push(h(block.tag, block.attributes, HTMLFreeze));
          }
        }

        // Is Text
        if (node.nodeType === 3) {
          elements.push(getText(node));
        }
      }

      return elements;
    };

    // Create the initial #document-fragment
    const html = props.html ? parse(props.html) : "";

    // Generate the Vue component's
    const elements = walkFragment(html);

    // Actually render the thing
    return () => h(props.tag, { class: "theme-html" }, [...elements]);
  },
};
</script>
