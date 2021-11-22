/**
 * 📦
 * Common object wrapper
 * @author Noé Cruz | https://www.linkedin.com/in/zurckz/
 * @version 1.0.0
 */
export interface Pair<L, R> {
  right?: R;
  left?: L;
  hasBoth: boolean;
}
