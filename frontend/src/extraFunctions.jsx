export function clamp(num, minimum, maximum){
    let newNum = num

    if(newNum > maximum){
      newNum = maximum
    }
    if(newNum < minimum){
      newNum = minimum
    }

    return newNum
  }