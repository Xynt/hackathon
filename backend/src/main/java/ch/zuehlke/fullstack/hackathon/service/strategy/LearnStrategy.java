package ch.zuehlke.fullstack.hackathon.service.strategy;

import com.zuehlke.hackathon.peoplefinder.model.Team;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LearnStrategy implements Strategy {

    @Override
    public StrategyName getName() {
        return StrategyName.LEARN;
    }

    @Override
    public List<Team> calculate(Team team, int dimension) {
        // TODO (ZUHA-12) Please implement me further

        int numOfMembers = team.getMembers().size();
        int lines = (int) Math.pow(2, numOfMembers) - 1;

        List<String> peopleCodes = List.copyOf(team.getMembers().keySet());

        System.out.println("People");
        System.out.println(peopleCodes);
        System.out.println();

        boolean[][] matrix = new boolean[lines][numOfMembers];

        System.out.println("Possible teams");
        for (int x = 0; x < matrix.length; x++) {
            String binary = String.format("%0" + numOfMembers + "d", Integer.parseInt(Integer.toBinaryString(x + 1)));
            if (binary.chars().filter(ch -> ch == '1').count() == dimension) {

                List<String> people = new ArrayList<>();

                for (int y = 0; y  < matrix[x].length; y++) {
                    matrix[x][y] = binary.charAt(y) == '1';
                    if (matrix[x][y]) {
                        String personCode = peopleCodes.get(y);
                        people.add(personCode);
                    }
                }

                System.out.println(people);
            }
        }

        // Map<List<String>, Criteria>

        return List.of(team);
    }
}
