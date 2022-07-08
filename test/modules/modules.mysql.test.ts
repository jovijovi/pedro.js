import {Mysql} from '../../lib/modules/mysql';
import {DataTypes, Model} from 'sequelize';

interface IMockAnimals extends Model {
	id: number;
	name: string;
	color: string;
}

test('Connection', async () => {
	// Connect
	const engine = Mysql.Connect({
		uri: 'mysql://root:example@localhost:3306/mock_pedro',
	});

	// Ping
	await Mysql.Ping(engine);

	const Animal = engine.define<IMockAnimals>('Animal', {
		id: {
			primaryKey: true,
			type: DataTypes.INTEGER.UNSIGNED,
		},
		name: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		color: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
	}, {
		tableName: 'animals',
		timestamps: false,  // disable timestamp by default, ref: <https://sequelize.org/master/manual/model-basics.html#timestamps>
	});

	// Insert
	const rsp1 = await Animal.create({name: 'cat', color: 'white'});
	console.log("Response1=", rsp1);
	const rsp2 = await Animal.create({name: 'cat', color: 'black'});
	console.log("Response2=", rsp2);

	// Find
	console.log("FindAll=", JSON.stringify(await Animal.findAll(), null, 4));

	// Count
	console.log("Count=", await Animal.count());

	// Count (raw query)
	const result = await engine.query("SELECT COUNT(1) as count FROM animals", {
		plain: true,
	})
	console.log("Count=", result.count);

	// Update
	await Animal.update({color: 'black'}, {
		where: {
			name: 'cat',
		}
	})

	// Find
	console.log("FindAll=", JSON.stringify(await Animal.findAll(), null, 4));

	// Delete
	await Animal.destroy({
		where: {
			name: 'cat',
		}
	})
	console.log("FindAll=", await Animal.findAll());

	// Close
	await engine.close();
})

test('Connection in another way', async () => {
	// Connect
	// URI: mysql://root:example@localhost:3306/mock_pedro
	const engine = Mysql.Connect({
		db: "mock_pedro",
		ip: "localhost",
		port: 3306,
		secret: "example",
		user: "root",
		uri: "",
	});

	// Ping
	await Mysql.Ping(engine);

	// Close
	await engine.close();

	// Ping again
	// It will be failed if ping again since the client is already closed
	try {
		await Mysql.Ping(engine);
	} catch (e) {
		console.debug("Expect Error=", e);
	}
})

