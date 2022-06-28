class RucksackApp{
	static boxItems = [1111, 5, 222, 3, 14, 4, 9, 2, 12, 1, 6]
	static currentItems = []
	static maxPayload = null
	static globalIndex = null
	static currentIndex = null

	static main() {
		const { payload, index } = this.getConfigInput()
		if (index < 0 || index > this.boxItems.length - 1) {
			console.log("Рюкзак не был укомплектован! Индекс некорректный.")
			return
		}
		if (payload <= 0) {
			console.log("Рюкзак не был укомплектован! Грузоподъмность указана неправильно.")
			return
		}
		this.maxPayload = payload
		this.globalIndex = index
		this.currentIndex = this.globalIndex

		const resultBool = this.knapsack(this.maxPayload, this.currentIndex)
		if (!resultBool || this.currentItems.reduce((acc, item) => acc + item, 0) !== this.maxPayload) {
			console.log("Рюкзак не был укомплектован!")
			return
		}
		console.log(`Рюкзак был собран! Предметы: ${this.currentItems}`)
	}
	static knapsack(weight, index) {
		if (weight === 0 || this.globalIndex === this.boxItems.length) return true
		if (weight < 0 || index === this.boxItems.length) return false

		const newWeight = weight - this.boxItems[index]
		this.currentItems.push(this.boxItems[index])
		++index
		const resultRec = this.knapsack(newWeight, index)

		if (!resultRec) {
			if (newWeight < 0) this.currentItems.pop()
			if (index === this.boxItems.length) {
				++this.globalIndex
				index = this.globalIndex
				this.currentItems = []
				return this.knapsack(this.maxPayload, index)
			}
			return this.knapsack(weight, index)
		}
		return true
	}
	static getConfigInput() {
		const maxSize = prompt("Укажите максимальную грузоподъемность рюкзака", "")
		const userIndex = prompt(`Введите индекс предмета в коробке, с которого начинать комплектование рюкзака. Допускается: от 0 до ${this.boxItems.length - 1} включительно`, "")
		return { payload: Number(maxSize), index: Number(userIndex) }
	}
}

RucksackApp.main()

