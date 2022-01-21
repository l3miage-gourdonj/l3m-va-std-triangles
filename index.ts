// Import stylesheets
import './style.css';
import { FCT_TRIANGLE, TriangleType } from './triangles';
import './utils';
import { Assertion, LogTests } from './utils';

/***********************************************************************************************************************
 * A FAIRE : Complétez avec votre mail UGA
 */
const mailIdentification = 'jeremie.gourdon@etu.univ-grenoble-alpes.fr';

/***********************************************************************************************************************
 * A FAIRE : Fonction qui renvoie le type d'un triangle
 * "INVALIDE" | "SCALÈNE" | "ISOCÈLE" | "ÉQUILATÉRAL"
 */
function f(a: number, b: number, c: number): TriangleType {
  if (a <= 0 || b <= 0 || c <= 0 || a + b <= c || a + c <= b || b + c <= a) {
    return 'INVALIDE';
  } else if (a === b && a === c) {
    return 'ÉQUILATÉRAL';
  } else if (a == b || b == c || a == c) {
    return 'ISOCÈLE';
  } else {
    return 'SCALÈNE';
  }
}

/***********************************************************************************************************************
 * A FAIRE : Liste de tests à effectuer
 * Chaque test est exprimé par un objet contenant 3 attributs
 *   - args : le tableau des arguments à passer à la fonction f
 *   - expectedResult : le résultat attendu
 *   - comment : un commentaire sous forme de chaine de caractère
 */
const tests: Assertion<Parameters<FCT_TRIANGLE>, ReturnType<FCT_TRIANGLE>>[] = [
  {
    args: [1, 1, 1],
    expectedResult: 'ÉQUILATÉRAL',
    comment:
      'Un triangle dont les côtés sont de longueur 1 devrait être classé comme équilatéral',
  },
  {
    args: [-1, 1, 1],
    expectedResult: 'INVALIDE',
    comment:
      'Un triangle dont au moin un coté a une longueur négative devrait etre invalide',
  },
  {
    args: [1, -1, 1],
    expectedResult: 'INVALIDE',
    comment:
      'Un triangle dont au moin un coté a une longueur négative devrait etre invalide',
  },
  {
    args: [1, 1, -2],
    expectedResult: 'INVALIDE',
    comment:
      'Un triangle dont au moin un coté a une longueur négative devrait etre invalide',
  },
  {
    args: [0, 2, 1],
    expectedResult: 'INVALIDE',
    comment:
      'Un triangle dont au moin un coté a une longueur a 0 devrait etre invalide',
  },
  {
    args: [2, 0, 1],
    expectedResult: 'INVALIDE',
    comment:
      'Un triangle dont au moin un coté a une longueur a 0 devrait etre invalide',
  },
  {
    args: [2, 1, 0],
    expectedResult: 'INVALIDE',
    comment:
      'Un triangle dont au moin un coté a une longueur a 0 devrait etre invalide',
  },
  {
    args: [2, 1, 1],
    expectedResult: 'INVALIDE',
    comment: "Un triangle dont l'air est égale a 0 devrait etre invalide",
  },
  {
    args: [1, 2, 1],
    expectedResult: 'INVALIDE',
    comment: "Un triangle dont l'air est égale a 0 devrait etre invalide",
  },
  {
    args: [1, 1, 2],
    expectedResult: 'INVALIDE',
    comment: "Un triangle dont l'air est égale a 0 devrait etre invalide",
  },
  {
    args: [4, 6, 11],
    expectedResult: 'INVALIDE',
    comment: "Un triangle dont l'air est inferieur a 0 devrait etre invalide",
  },
  {
    args: [8, 25, 16],
    expectedResult: 'INVALIDE',
    comment: "Un triangle dont l'air est inferieur a 0 devrait etre invalide",
  },
  {
    args: [25, 16, 8],
    expectedResult: 'INVALIDE',
    comment: "Un triangle dont l'air est inferieur a 0 devrait etre invalide",
  },
  {
    args: [2, 2, 3],
    expectedResult: 'ISOCÈLE',
    comment:
      'Un triangle dont 2 des cotés ont la meme longueur devrait être classé comme ISOCÈLE',
  },
  {
    args: [2, 3, 2],
    expectedResult: 'ISOCÈLE',
    comment:
      'Un triangle dont 2 des cotés ont la meme longueur devrait être classé comme ISOCÈLE',
  },
  {
    args: [3, 2, 2],
    expectedResult: 'ISOCÈLE',
    comment:
      'Un triangle dont 2 des cotés ont la meme longueur devrait être classé comme ISOCÈLE',
  },
  {
    args: [2, 3, 4],
    expectedResult: 'SCALÈNE',
    comment:
      'Un triangle dont les 3 cotés ont des longueurs différentes devrait être classé comme SCALÈNE',
  },
];

/***********************************************************************************************************************
 * NE PAS TOUCHER
 */
LogTests<FCT_TRIANGLE>(
  "Fonction qui renvoie le type d'un triangle",
  f,
  'f',
  tests,
  document.querySelector('#local')
);

const url =
  'https://script.google.com/macros/s/AKfycbxzfVpq-9XKqdDwfSScgyYV6y90x0hmSji5N7KpqCZCsbjQu2ixbcGQq5rCOdFkR33E/exec';

const bt = document.querySelector('button');
const section = document.querySelector('#results');

bt.onclick = async () => {
  bt.disabled = true;
  const fstr = f.toString();
  const bodyStr = fstr.slice(fstr.indexOf('{') + 1, fstr.lastIndexOf('}'));

  const form = new FormData();
  form.append('id', mailIdentification);
  form.append('f', bodyStr);
  form.append('tests', JSON.stringify(tests));

  const R = await fetch(url, {
    method: 'POST',
    body: form,
  });
  const res = await R.json();
  let t = 0;
  if (res.error) {
    section.innerHTML = `<pre>${res.error}</pre>`;
    const [, strT] = /([0-9]*) secondes$/.exec(res.error);
    t = +strT;
    console.log(strT, t);
    const inter = setInterval(() => {
      t--;
      if (t <= 0) {
        bt.disabled = false;
        section.textContent = '';
        clearInterval(inter);
      } else {
        section.innerHTML = `<pre>Vous ne pouvez pas resoumettre avant ${t} secondes
  </pre>`;
      }
    }, 1000);
  } else {
    section.innerHTML = `
      Tests de contrôle passés par votre code (vert = le test passe):<br/>
      <table class="result"><tbody><tr>
      ${res.testPassed
        .map((t, i) => `<td class="${t ? '' : 'in'}correct">${i}</td>`)
        .join('')}
      </tr></tbody></table>
      <br/><br/>
      Mutants éliminés par votre code (vert = le mutant est éliminé) :<br/>
      <table class="result"><tbody><tr>
      ${res.discardedMutants
        .map((t, i) => `<td class="${t ? '' : 'in'}correct">${i}</td>`)
        .join('')}
      </tr></tbody></table>
    `;
  }
};
