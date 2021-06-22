module.exports = function(sequelize, DataTypes){
    const product = sequelize.define('Product',{
        name :{
            type: DataTypes.STRING(20),
            allowNull : false
        },
        price : {
            type : DataTypes.INTEGER(10),
            allowNull : false
        },
        person : {
            type: DataTypes.STRING(20),
            allowNull : false
        },
        description : {
            type: DataTypes.STRING(300),
            allowNull : false
        },
        img: {
            type : DataTypes.STRING(300),
            defaultValue : '/images/icons/camera.png',
            allowNull : true
        }
    })
    return product
}

// {id: 1, person: "aerteat", name: "basketball1", price: 2000, img: