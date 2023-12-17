"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  mounted() {
    common_vendor.index.getStorage({
      key: "name",
      success: (res) => {
        console.log(res);
        this.avatarUrl = res.data.avatarUrl;
        this.nameUsed = res.data.name;
      }
    });
  },
  data() {
    const defaultAvatarUrl = "https://upload.wikimedia.org/wikipedia/zh/thumb/b/bb/Emblem_of_Beijing_University_of_Posts_and_Telecommunications.svg/1280px-Emblem_of_Beijing_University_of_Posts_and_Telecommunications.svg.png";
    return {
      nameUsed: "",
      hasSubmit: false,
      avatarUrl: defaultAvatarUrl,
      inputValue: "请输入真实姓名"
    };
  },
  computed: {
    noNameUsed() {
      return this.nameUsed == "";
    },
    avatarText() {
      if (this.noNameUsed) {
        return "更换头像";
      } else {
        return "我的头像";
      }
    }
  },
  methods: {
    handleChooseAvatar: function(e) {
      const { avatarUrl } = e.detail;
      this.avatarUrl = avatarUrl;
      console.log(this.avatarUrl);
    },
    updateInputValue: function(e) {
      const { value } = e.detail;
      this.inputValue = value;
      console.log(this.inputValue);
    },
    handleSubmit: function() {
      if (this.inputValue == "请输入真实姓名" || this.inputValue == "") {
        setTimeout(() => {
          common_vendor.index.showToast({
            title: "请输入真实姓名",
            icon: "error"
          });
        }, 1e3);
        return;
      }
      const submitInfo = { avatarUrl: this.avatarUrl, name: this.inputValue };
      console.log(submitInfo);
      this.hasSubmit = true;
      common_vendor.index.setStorage({
        key: "name",
        data: submitInfo
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.hasSubmit
  }, !$data.hasSubmit ? common_vendor.e({
    b: $data.avatarUrl,
    c: common_vendor.t($options.avatarText),
    d: !$options.noNameUsed,
    e: common_vendor.o((...args) => $options.handleChooseAvatar && $options.handleChooseAvatar(...args)),
    f: !$options.noNameUsed
  }, !$options.noNameUsed ? {
    g: common_vendor.t($data.nameUsed)
  } : {
    h: common_vendor.o((...args) => $options.updateInputValue && $options.updateInputValue(...args))
  }, {
    i: $options.noNameUsed
  }, $options.noNameUsed ? {
    j: common_vendor.o((...args) => $options.handleSubmit && $options.handleSubmit(...args))
  } : {}) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/Projects/lantu-lottery-weapp/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
