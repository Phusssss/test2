import { Component, OnInit } from '@angular/core';

interface Adjective {
  jp: string;
  vn: string;
  opposite?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  adjectives: Adjective[] = [
    { jp: 'おおきい', vn: 'To', opposite: 'ちいさい' },
    { jp: 'あたらしい', vn: 'Mới', opposite: 'ふるい' },
    { jp: 'あかるい', vn: 'Sáng', opposite: 'くらい' },
    { jp: 'あたたかい', vn: 'Ấm Áp', opposite: 'すずしい' },
    { jp: 'あつい', vn: 'Nóng (Thời tiết)', opposite: 'さむい' },
    { jp: 'あつい', vn: 'Nóng (Cảm giác)', opposite: 'つめたい' },
    { jp: 'あつい', vn: 'Dày', opposite: 'うすい' },
    { jp: 'いい', vn: 'Tốt', opposite: 'よくない' },
    { jp: 'よい', vn: 'Tốt', opposite: 'よくない' },
    { jp: 'おいしい', vn: 'Ngon', opposite: 'まずい' },
    { jp: 'すくない', vn: 'Ít', opposite: 'おおい' },
    { jp: 'おもい', vn: 'Nặng', opposite: 'かるい' },
    { jp: 'おそい', vn: 'Chậm/Muộn', opposite: 'はやい' },
    { jp: 'おもしろい', vn: 'Thú vị', opposite: 'つまらない' },
    { jp: 'たかい', vn: 'Cao', opposite: 'ひくい' },
    { jp: 'たかい', vn: 'Đắt', opposite: 'やすい' },
    { jp: 'せまい', vn: 'Hẹp', opposite: 'ひろい' },
    { jp: 'ちかい', vn: 'Gần', opposite: 'とおい' },
    { jp: 'ながい', vn: 'Dài', opposite: 'みじかい' },
    { jp: 'ふとい', vn: 'Béo/Tròn', opposite: 'ほそい' },
    { jp: 'むずかしい', vn: 'Khó', opposite: 'やさしい' },
    { jp: 'ひま', vn: 'Rảnh', opposite: 'いそがしい' },
    { jp: 'ふべん', vn: 'Bất tiện', opposite: 'べんり' },
    { jp: 'きれいな', vn: 'Đẹp/Sạch', opposite: 'きたない' },
    { jp: 'たのしい', vn: 'Vui vẻ', opposite: 'さびしい' },
    { jp: 'じょうず', vn: 'Giỏi', opposite: 'へた' },
    { jp: 'にぎやか', vn: 'Náo nhiệt', opposite: 'しずか' },
    { jp: 'かんたん', vn: 'Đơn giản', opposite: 'ふくざつ' },
    { jp: 'あぶない', vn: 'Nguy hiểm', opposite: 'あんぜん' },
    { jp: 'きけん', vn: 'Nguy hiểm', opposite: 'あんぜん' },
    { jp: 'あまい', vn: 'Ngọt' },
    { jp: 'からい', vn: 'Cay' },
    { jp: 'にがい', vn: 'Đắng' },
    { jp: 'すっぱい', vn: 'Chua' },
    { jp: 'しおからい', vn: 'Mặn' },
    { jp: 'うすい', vn: 'Nhạt' },
    { jp: 'いたい', vn: 'Đau' },
    { jp: 'うるさい', vn: 'Ồn ào' },
    { jp: 'うれしい', vn: 'Vui mừng' },
    { jp: 'かわいい', vn: 'Đáng yêu' },
    { jp: 'まるい', vn: 'Tròn' },
    { jp: 'わかい', vn: 'Trẻ' },
    { jp: 'いろいろ', vn: 'Đa dạng' },
    { jp: 'さまざま', vn: 'Đa dạng' },
    { jp: 'げんき', vn: 'Khỏe' },
    { jp: 'ざんねん', vn: 'Đáng tiếc' },
    { jp: 'じょうぶ', vn: 'Chắc/Bền' },
    { jp: 'しんぱい', vn: 'Lo lắng' },
    { jp: 'だいじょうぶ', vn: 'Không sao đâu' },
    { jp: 'たいせつ', vn: 'Quan trọng' },
    { jp: 'たいへん', vn: 'Vất vả' },
    { jp: 'むり', vn: 'Quá sức' },
    { jp: 'ゆうめいな', vn: 'Nổi tiếng' },
    { jp: 'りっぱ', vn: 'Hoành tráng' },
    { jp: 'すき', vn: 'Thích', opposite: 'きらいな' },
    { jp: 'きらいな', vn: 'Ghét', opposite: 'すき' },
    { jp: 'すばらしい', vn: 'Tuyệt vời' }
  ];

  currentAdjective: Adjective | null = null;
  options: Adjective[] = [];
  feedback: string = '';
  feedbackClass: string = '';
  showNextButton: boolean = false;

  ngOnInit() {
    this.loadQuestion();
  }

  playAudio() {
    if (this.currentAdjective) {
      const utterance = new SpeechSynthesisUtterance(this.currentAdjective.jp);
      utterance.lang = 'ja-JP';
      speechSynthesis.speak(utterance);
    }
  }

  loadQuestion() {
    this.currentAdjective = this.getRandomAdjective();
    this.options = this.getRandomOptions(this.currentAdjective);
    this.feedback = '';
    this.feedbackClass = '';
    this.showNextButton = false;
    this.playAudio();
  }

  checkAnswer(selected: Adjective) {
    if (selected.jp === this.currentAdjective?.jp) {
      this.feedback = 'Correct!';
      this.feedbackClass = 'text-green-600';
    } else {
      this.feedback = `Incorrect. The correct answer is ${this.currentAdjective?.jp} (${this.currentAdjective?.vn}).`;
      this.feedbackClass = 'text-red-600';
    }
    this.showNextButton = true;
  }

  private getRandomAdjective(): Adjective {
    return this.adjectives[Math.floor(Math.random() * this.adjectives.length)];
  }

  private getRandomOptions(correct: Adjective): Adjective[] {
    const options = [correct];
    while (options.length < 4) {
      const randomAdj = this.getRandomAdjective();
      if (!options.some(opt => opt.jp === randomAdj.jp)) {
        options.push(randomAdj);
      }
    }
    return options.sort(() => Math.random() - 0.5);
  }
}