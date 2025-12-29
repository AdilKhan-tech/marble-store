const {DataTypes} = require("sequelize");
const sequelize = require("../config/database");

const Occasion = sequelize.define("Occasion",{
    
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name_en:{
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notNull: { msg: "Name English is required" },
            notEmpty: { msg: "Name English cannot be empty" },
            len: {
              args: [2, 100],
              msg: "Name English must be between 2 and 100 characters",
            },
          },
    },
    name_ar:{
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notNull: { msg: "Name Arabic is required" },
            notEmpty: { msg: "Name Arabic cannot be empty" },
            len: {
              args: [2, 100],
              msg: "Name Arabic must be between 2 and 100 characters",
            },
          },
    },
    parent_ocassion:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull: { msg: "Parent occasion is required" },
          notEmpty: { msg: "Parent occasion cannot be empty" },
          len: {
              args: [2, 100],
            },
      }
    },
    slug:{
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            is: {
              args: /^[a-z0-9-]+$/i,
              msg: "Slug must contain only letters, numbers and hyphens",
            },
        },
    },
    image_url:{
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            isValid(value) {
              if (!value) return;
    
              const isUrl = /^https?:\/\/.+/.test(value);
              const isLocalPath = /^uploads\/.+/.test(value);
    
              if (!isUrl && !isLocalPath) {
                throw new Error(
                  "Image must be a valid URL or a local upload path"
                );
              }
            },
        },
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updated_at:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },

},{
    tableName: "occasions",
    timestamps: false,
});

module.exports = Occasion;