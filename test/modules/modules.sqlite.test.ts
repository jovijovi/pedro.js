import {Sqlite} from '../../lib/modules/sqlite';
import {DataTypes, Model} from 'sequelize';

interface IMockAnimals extends Model {
	id: number;
	name: string;
	color: string;
}

test('Connection', async () => {
	// Connect
	const engine = Sqlite.Connect({
		uri: 'sqlite://./test/modules/database/sqlite/world.db',
	});

	// Ping
	await engine.Ping();

	// Model attributes
	const attrs = {
		id: {
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		name: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		color: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
	};

	// Model options
	const opts = {
		tableName: 'animals',
		timestamps: false,  // Disable timestamp by default, ref: <https://sequelize.org/master/manual/model-basics.html#timestamps>
	};

	// Define model
	const Animal = engine.client.define<IMockAnimals>('Animal', attrs, opts);

	// Creates the table if it doesn't exist (and does nothing if it already exists)
	await Animal.sync();

	// Insert
	const rsp1 = await Animal.create({name: 'cat', color: 'yellow'});
	console.log("Response1=", rsp1);
	const rsp2 = await Animal.create({name: 'cat', color: 'blue'});
	console.log("Response2=", rsp2);

	// Find
	console.log("FindAll=", JSON.stringify(await Animal.findAll(), null, 4));

	// Count
	console.log("Count=", await Animal.count());

	// Count (raw query)
	const result = await engine.client.query("SELECT COUNT(1) as count FROM animals", {
		plain: true,
	})
	console.log("Count=", result.count);

	// Update
	await Animal.update({color: 'red'}, {
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
	await engine.Close();
})
