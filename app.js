//Gets a random value between 5 and 12 
//math.floor rounds down to whole number
function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            battleLog: [],
            winner: null
        }
    },
    computed: {
        monsterBarStyles() {
            if (this.monsterHealth < 0) {
                return {width: '0%'}
            }
            return {width: this.monsterHealth + '%'}; 
        },
        playerBarStyles() {
            if (this.playerHealth < 0) {
                return {width: '0%'}
            }
            return {width: this.playerHealth + '%'}
        },
        checkSpecialAttack(){
            // checks if divisible by 3. i.e you can speacial attack every 3 rounds
            return this.currentRound % 3 !== 0;
        }
    },
    methods: {
        startGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.winner = null;
            this.currentRound = 0;
            this.battleLog = [];
        },
        updateRoundCounter(){
            this.currentRound++;
        },
        attackMonster(){
            const attackValue = getRandomValue(5, 12);
            //same as this.monsterHealth = this.monsterHealth - attackValue;
            this.monsterHealth -= attackValue;
            this.addLogMessage('player', 'attack', attackValue);
            this.attackPlayer();
            this.updateRoundCounter();
        },
        attackPlayer() {
            const attackValue = getRandomValue(8, 15);
            this.playerHealth -= attackValue;
            this.addLogMessage('monster', 'attack', attackValue);
        },
        specialAttack() {
                const attackValue = getRandomValue(13, 23);
                this.monsterHealth -= attackValue;
                this.addLogMessage('player', 'attack', attackValue);
                this.attackPlayer();
                this.updateRoundCounter();
        },
        heal(){
            this.updateRoundCounter();
            const healValue = getRandomValue(8,20);
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }
            this.addLogMessage('player', 'heal', healValue);
            this.attackPlayer();
        },
        surrender(){
            this.winner = 'monster';
        },
        addLogMessage(who, what, value) {
            //Unshift over push to add to start of array
            this.battleLog.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            });
        }
    },
    watch: {
        playerHealth(value){
            if(value <= 0 && this.monsterHealth <= 0){
                //draw
                this.winner = 'draw';
            } else if (value <= 0){
                //player lost
                this.winner = 'monster';
            }
        },
        monsterHealth(value){
            if(value <= 0 && this.playerHealth <= 0){
                //draw
                this.winner = 'draw';
            } else if (value <= 0){
                //Monster lost
                this.winner = 'player';
            }
        }
    }
});

app.mount('#game');